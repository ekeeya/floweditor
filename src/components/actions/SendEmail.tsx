import * as React from 'react';
import { ActionComp } from '../Action';
import { ActionForm } from '../NodeForm';
import { SendEmail } from '../../FlowDefinition';
import { NodeModalProps } from '../NodeModal';
import { TextAreaElement } from '../form/TextAreaElement';
import { InputElement } from '../form/InputElement';
import { EmailElement } from '../form/EmailElement';



export class SendEmailComp extends ActionComp<SendEmail> {
    renderNode(): JSX.Element {
        return <div>{this.getAction().subject}</div>
    }
}

interface SendEmailState {
    emails: { label: string, value: string }[]
}

export class SendEmailForm extends ActionForm<SendEmail, SendEmailState> {

    renderForm(): JSX.Element {
        var action = this.getAction();
        var ref = this.ref.bind(this);
        return (
            <div>
                <EmailElement ref={ref} name="Recipient" placeholder="To" emails={action.emails} required />
                <InputElement ref={ref} name="Subject" placeholder="Subject" value={action.subject} required />
                <TextAreaElement ref={ref} name="Message" showLabel={false} value={action.body} required />
            </div>
        )
    }

    submit(modal: NodeModalProps) {

        var eles = this.getElements();
        var emailEle = eles[0] as EmailElement;
        var subjectEle = eles[1] as InputElement;
        var bodyEle = eles[2] as TextAreaElement;

        var emails: string[] = []
        for (let email of emailEle.state.emails) {
            emails.push(email.value);
        }

        var newAction: SendEmail = {
            uuid: this.getUUID(),
            type: this.props.config.type,
            body: bodyEle.state.value,
            subject: subjectEle.state.value,
            emails: emails
        }

        modal.onUpdateAction(newAction);
    }
}