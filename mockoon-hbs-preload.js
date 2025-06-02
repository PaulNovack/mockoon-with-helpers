console.log('[HBS-PRELOAD] Starting preload');
const Handlebars = require(
    require.resolve('handlebars', { paths: [__dirname] })
);

require('handlebars-helpers')({ handlebars: Handlebars });

const declineMap = {
    99101: 'INSUFFICIENT_FUNDS',
    99102: 'INVALID_CARD_NUMBER',
    99103: 'CALL_ISSUER',
    99104: 'PICKUP_CARD',
    99105: 'CARD_LIMIT_EXCEEDED',
    99107: 'INVALID_CVC',
    99108: 'INVALID_EXPIRATION_DATE',
    99109: 'NOT_SUPPORTED',
    99110: 'RESTRICTED_CARD',
    99111: 'FRAUDULENT',
    99112: 'PROCESSING_ERROR',
    99113: 'GENERIC_DECLINE',
    99114: 'INVALID_DATA',
    99115: 'UNRESOLVED',
    99116: 'INVALID_ACCOUNT_NUMBER',
    99117: 'INVALID_ROUTING_NUMBER',
    99118: 'STOP_PAYMENT',
    99119: 'NOT_PERMITTED',
    99120: 'ACCOUNT_LIMIT_EXCEEDED',
    99122: 'ACCOUNT_BLOCKED',
    99123: 'TIMEOUT',
    99125: 'CALL_ACQUIRER',
    99126: 'RESUBMIT_TRANSACTION',
    99127: 'CARD_EXPIRED',
    99128: 'AVS_CHECK_FAILED',
    99129: 'PARTIALLY_APPROVED',
    99130: 'DUPLICATE',
    99134: 'NOT_ACTIVE'
};

Handlebars.registerHelper('declineCode', (amount) => {
    const key = Number(amount);
    return declineMap[key] || 'APPROVED';
});
console.log(
    '[HBS-PRELOAD] declineCode() registered? →',
    typeof Handlebars.helpers.declineCode === 'function' ? '✔' : '✘'
);


Handlebars.registerHelper('cardType', (raw) => {
    const num = String(raw || '').replace(/\D/g, '');
    // Visa: length 13 or 16, starts with 4
    if (/^4\d{12}(?:\d{3})?$/.test(num)) {
        return 'Visa';
    }
    // MasterCard:
    //  - 51–55 prefix (“5[1-5]” + 14 digits)
    //  - or 2221–2720 prefix (per the newer 2-series BINs)
    if (
        /^(?:5[1-5]\d{14}|2(?:2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/.test(
            num
        )
    ) {
        return 'MasterCard';
    }
    // American Express: starts with 34 or 37, total 15 digits
    if (/^3[47]\d{13}$/.test(num)) {
        return 'American Express';
    }
    // Discover: 6011xxxx... or 65xxxx... (total 16 digits)
    if (/^6(?:011|5\d{2})\d{12}$/.test(num)) {
        return 'Discover';
    }
    return 'Unknown';
});

console.log(
    '[HBS-PRELOAD] cardType() registered? →',
    typeof Handlebars.helpers.cardType === 'function' ? '✔' : '✘'
);
Handlebars.registerHelper('hello', () => 'world');
console.log(
    '[HBS-PRELOAD] After patch: ',
    typeof Handlebars.helpers.hello === 'function'
        ? 'hello() is registered'
        : 'hello() is MISSING'
);