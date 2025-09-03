export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-SV', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function sanitizeDecimalNumber(amount: string):number {
    let sanitizedValue = amount.replace(/[^0-9.]/g, '');          
        
    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
        sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
    }
    
    if (sanitizedValue === '' || sanitizedValue === '.') sanitizedValue = '0';
    if (sanitizedValue.length > 1 && !sanitizedValue.includes('.')) {
        sanitizedValue = sanitizedValue.replace(/^0+/, '') || '0';
    }
    return Number(sanitizedValue);
}