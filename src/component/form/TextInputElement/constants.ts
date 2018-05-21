import { CompletionOption } from '../../../store';

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
export enum KeyValues {
    KEY_AT = '@',
    KEY_SPACE = ' ',
    KEY_ENTER = 'Enter',
    KEY_UP = 'ArrowUp',
    KEY_DOWN = 'ArrowDown',
    KEY_TAB = 'Tab',
    KEY_ESC = 'Escape',
    KEY_BACKSPACE = 'Backspace'
}

export const MAX_GSM_SINGLE = 160;
export const MAX_GSM_MULTI = 153;
export const MAX_UNICODE_SINGLE = 70;
export const MAX_UNICODE_MULTI = 67;

export const COMPLETION_HELP = 'Tab to complete, enter to select';

export const OPTIONS: CompletionOption[] = [
    { name: 'contact', description: 'The name of the contact.' },
    { name: 'contact.name', description: 'The name of the contact.' },
    { name: 'contact.language', description: 'The language code for the contact.' },
    { name: 'contact.fields', description: 'Custom fields on the contact.' },
    { name: 'contact.groups', description: 'The groups for the contact.' },
    { name: 'contact.urns', description: 'URNs on the contact.' },
    { name: 'contact.urns.tel', description: 'The preferred telephone number for the contact.' },
    { name: 'contact.urns.telegram', description: 'The preferred telegram id for the contact.' },
    { name: 'input', description: 'The last input from the contact if any.' },
    { name: 'run', description: 'Run details' },
    { name: 'run.contact', description: 'The contact in this run' },
    { name: 'run.results', description: 'Results for the run' },
    { name: 'child', description: 'Run details after running a child flow' },
    { name: 'child.results', description: 'The results for the child flow' },
    { name: 'parent', description: 'Run details if being called from a parent flow' },
    { name: 'parent.results', description: 'The results for the parent flow' },
    { name: 'webhook', description: 'The body of the webhook response' },
    { name: 'webhook.status', description: 'The status of the webhook call' },
    { name: 'webhook.status_code', description: 'The status code returned from the webhook' },
    { name: 'webhook.url', description: 'The URL which was called' },
    { name: 'webhook.body', description: 'The body of the webhook response' },
    {
        name: 'webhook.json',
        description: 'The JSON parsed body of the response, can access subelements'
    },
    { name: 'webhook.request', description: 'The raw request of the webhook including headers' },
    { name: 'webhook.response', description: 'The raw response of the webhook including headers' }
];

export const GSM: { [key: string]: number } = {
    // char: charCode
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    '\n': 10,
    '\f': 12,
    '\r': 13,
    ' ': 32,
    '!': 33,
    '"': 34,
    '#': 35,
    $: 36,
    '%': 37,
    '&': 38,
    "'": 39,
    '(': 40,
    ')': 41,
    '*': 42,
    '+': 43,
    ',': 44,
    '-': 45,
    '.': 46,
    '/': 47,
    ':': 58,
    ';': 59,
    '<': 60,
    '=': 61,
    '>': 62,
    '?': 63,
    '@': 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    '[': 91,
    '\\': 92,
    ']': 93,
    '^': 94,
    _: 95,
    a: 97,
    b: 98,
    c: 99,
    d: 100,
    e: 101,
    f: 102,
    g: 103,
    h: 104,
    i: 105,
    j: 106,
    k: 107,
    l: 108,
    m: 109,
    n: 110,
    o: 111,
    p: 112,
    q: 113,
    r: 114,
    s: 115,
    t: 116,
    u: 117,
    v: 118,
    w: 119,
    x: 120,
    y: 121,
    z: 122,
    '{': 123,
    '|': 124,
    '}': 125,
    '~': 126,
    '¡': 161,
    '£': 163,
    '¤': 164,
    '¥': 165,
    '§': 167,
    '¿': 191,
    Ä: 196,
    Å: 197,
    Æ: 198,
    Ç: 199,
    É: 201,
    Ñ: 209,
    Ö: 214,
    Ø: 216,
    Ü: 220,
    ß: 223,
    à: 224,
    ä: 228,
    å: 229,
    æ: 230,
    è: 232,
    é: 233,
    ì: 236,
    ñ: 241,
    ò: 242,
    ö: 246,
    ø: 248,
    ù: 249,
    ü: 252,
    Γ: 915,
    Δ: 916,
    Θ: 920,
    Λ: 923,
    Ξ: 926,
    Π: 928,
    Σ: 931,
    Φ: 934,
    Ψ: 936,
    Ω: 937,
    '€': 8364
};
