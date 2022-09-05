const wait = (time) => new Promise((res) => setTimeout(res, time));


const panelData = {
    payments: {
        "current": {
            "count": 210,
            "value": 2071375
        },
        "last": {
            "count": 214,
            "value": 2672806
        },
        "currentForecast": {
            "count": 93,
            "value": 792570
        },
        "lastForecast": {
            "count": 172,
            "value": 3055210
        }
    },
    orders: {
        "current": {
            "count": 5,
            "value": 725600
        },
        "last": {
            "count": 7,
            "value": 1060000
        }
    },
    'quote-consulting': {
        "current": {
            "numerator": 12,
            "denominator": 32,
            "ratio": 0.375
        },
        "last": {
            "numerator": 12,
            "denominator": 24,
            "ratio": 0.5
        }
    },
    'quote-offer': {
        "current": {
            "countNumerator": 14,
            "countDenominator": 40,
            "countRatio": 0.35,
            "valueNumerator": 1763600,
            "valueDenominator": 7040400,
            "valueRatio": 0.2504971308448384
        },
        "last": {
            "countNumerator": 1,
            "countDenominator": 8,
            "countRatio": 0.125,
            "valueNumerator": 160000,
            "valueDenominator": 1223200,
            "valueRatio": 0.13080444735120994
        }
    }


}

export const getPanelData = async (panel) => {
    await wait(200);
    const data = panelData[panel];
    console.log(data);
    return Promise.resolve(panelData[panel])
}

export const savePanels = async (panels) => {
    await wait(200);
    console.log(panels);
    return Promise.resolve()
}