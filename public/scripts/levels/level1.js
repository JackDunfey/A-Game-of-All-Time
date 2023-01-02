const level1_data = {
    "platforms": [
        {
            "type": "G",
            "start": 0,
            "end": width,
        },
        {
            "type": "P",
            "x": width,
            "y": height - Ground.HEIGHT - 100,
            "w": 200,
            "h": 20,
        },
        {
            "type": "P",
            "x": width + 150,
            "y": height - Ground.HEIGHT - 250,
            "w": 200,
            "h": 20,
        },
        {
            "type": "P",
            "x": width + 650,
            "y": height - Ground.HEIGHT - 200,
            "w": 200,
            "h": 20,
        },
        {
            "type": "G",
            "start": width + 925,
            "end": 10000,
        },
    ],
    "flag": [width+1225, height-Ground.HEIGHT],
    "min_jumps": 4,
}