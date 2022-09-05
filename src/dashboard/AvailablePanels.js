export const availablePanels = [
    {
        // Erfolgsquote BT: Anzahl KV(Sofort)+Anzahl KV(Angebot) [Bedingung KV-Kunde = Beratungstermin-Kunde] / Summe durchgeführt Beratungstermine
        'key': 'quote-consulting',
        'name': 'Erfolgsquote BT',
        'model': 'ratio',
        'options': {
            'numerator': 'Anzahl KV(Sofort)+Anzahl KV(Angebot)',
            'denominator': 'Durchgeführte BT',
            'ratio': 'Quote'
        }
    },
    {
        // Erfolgsquote Angebote: Anzahl Angebot Status erhalten / Anzahl Angebote
        'key': 'quote-offer',
        'name': 'Abschlussquote Angebot',
        'model': 'valueRatio',
        'options': {
            'countNumerator': 'Anzahl Angebote erhalten',
            'countDenominator': 'Anzahl Angebote gesamt',
            'countRatio': 'Quote Anzahl',
            'valueNumerator': 'Wert Angebote erhalten',
            'valueDenominator': 'Wert Angebote gesamt',
            'valueRatio': 'Quote Wert',
        }
    },
    {
        // Wert KV(Sofort) / KV(Angebot)
        'key': 'orders',
        'name': 'KV Übersicht (Sofort/Angebot)',
        'model': 'value',
        'options': {
            'count': 'Anzahl KV',
            'value': 'Wert KV'
        }
    },
    {
        // Zahlungen
        'key': 'payments',
        'name': 'Zahlungen',
        'forecast': true,
        'model': 'value',
        'options': {
            'count': 'Anzahl Zahlungen',
            'value': 'Wert Zahlungen'
        }
    },


]