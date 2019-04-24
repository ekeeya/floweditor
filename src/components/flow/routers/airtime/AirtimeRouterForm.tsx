import { react as bindCallbacks } from 'auto-bind';
import mutate from 'immutability-helper';
import * as React from 'react';
import Dialog, { ButtonSet } from '~/components/dialog/Dialog';
import { hasErrors } from '~/components/flow/actions/helpers';
import { RouterFormProps } from '~/components/flow/props';
import CurrencyElement, {
    AirtimeTransfer
} from '~/components/flow/routers/airtime/currency/CurrencyElement';
import TextInputElement from '~/components/form/textinput/TextInputElement';
import ValidationFailures from '~/components/form/ValidationFailures';
import TypeList from '~/components/nodeeditor/TypeList';
import { FormEntry, FormState, StringEntry } from '~/store/nodeEditor';
import { validate, validateRequired } from '~/store/validators';

import { nodeToState, stateToNode } from './helpers';

export interface AirtimeTransferEntry extends FormEntry {
    value: AirtimeTransfer;
}

export interface AirtimeRouterFormState extends FormState {
    amounts: AirtimeTransferEntry[];
    resultName: StringEntry;
}

export default class AirtimeRouterForm extends React.PureComponent<
    RouterFormProps,
    AirtimeRouterFormState
> {
    constructor(props: RouterFormProps) {
        super(props);

        this.state = nodeToState(props.nodeSettings);

        bindCallbacks(this, {
            include: [/^on/, /^handle/]
        });
    }

    private handleSave(): void {
        const missing: number[] = [];

        this.state.amounts.forEach((entry: AirtimeTransferEntry, index: number) => {
            if (entry.value.amount.trim().length === 0) {
                missing.push(index);
            }
        });

        let valid: boolean = !!!this.state.amounts.find(
            (entry: AirtimeTransferEntry) => (entry.validationFailures || []).length > 0
        );

        // make sure at least one has a value
        if (valid) {
            valid =
                this.state.amounts.find(
                    (entry: AirtimeTransferEntry) => entry.value.amount.trim().length > 0
                ) !== undefined;

            if (!valid) {
                this.setState({
                    valid: false,
                    validationFailures: [{ message: 'At least one amount to transfer is required' }]
                });
            }
        }

        if (valid) {
            this.props.updateRouter(stateToNode(this.props.nodeSettings, this.state));
            this.props.onClose(false);
        }
    }

    private handleUpdateResultName(result: string): void {
        const resultName = validate('Result Name', result, [validateRequired]);
        this.setState({ resultName, valid: this.state.valid && !hasErrors(resultName) });
    }

    public getButtons(): ButtonSet {
        return {
            primary: { name: 'Ok', onClick: this.handleSave },
            secondary: { name: 'Cancel', onClick: () => this.props.onClose(true) }
        };
    }

    public handleRemoved(index: number): void {
        // we found a match, merge us in
        const updated: any = mutate(this.state.amounts, {
            $splice: [[index, 1]]
        });
        this.setState({ amounts: updated });
    }

    public handleTransferChanged(idx: number, transfer: AirtimeTransferEntry): void {
        let updated: any = this.state.amounts;

        if (idx > -1) {
            // we found a match, merge us in
            updated = mutate(this.state.amounts, {
                $merge: { [idx]: transfer }
            });
        } else {
            // otherwise push us on
            updated = mutate(this.state.amounts, {
                $push: [transfer]
            });
        }

        this.setState({ amounts: updated, validationFailures: [] });
    }

    private renderAmount(index: number, entry: AirtimeTransferEntry): JSX.Element {
        return (
            <CurrencyElement
                key={'currency_' + index}
                exclude={this.state.amounts}
                currencies={this.props.assetStore.currencies}
                transfer={entry}
                index={index}
                onChange={this.handleTransferChanged}
                onRemove={this.handleRemoved}
            />
        );
    }

    private renderAmounts(): JSX.Element {
        const amounts = this.state.amounts.map((entry: AirtimeTransferEntry, index: number) => {
            return this.renderAmount(index, entry);
        });

        return (
            <div>
                {amounts}
                {this.renderAmount(-1, { value: { code: null, amount: '' } })}
            </div>
        );
    }

    public render(): JSX.Element {
        const typeConfig = this.props.typeConfig;

        const errors = this.state.validationFailures ? (
            <ValidationFailures validationFailures={this.state.validationFailures} />
        ) : null;

        return (
            <Dialog
                title={typeConfig.name}
                headerClass={typeConfig.type}
                buttons={this.getButtons()}
            >
                <TypeList
                    __className=""
                    initialType={typeConfig}
                    onChange={this.props.onTypeChange}
                />
                {this.renderAmounts()}
                {errors}
                <TextInputElement
                    name="Result Name"
                    entry={this.state.resultName}
                    onChange={this.handleUpdateResultName}
                    helpText="This name allows you to reference the results later using @results.whatever_the_name_is"
                />
            </Dialog>
        );
    }
}
