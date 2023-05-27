<style>

.markdown-body pre {
  max-height: 600px;
}
</style>

# Zodiac

## chlorinator eXO iQ

https://www.zodiac.com.au/salt-chlorinators/exo-pro

For HA, for this device you need to connect with nodeRED (see Below)

![eXO](https://cdn.shopify.com/s/files/1/0272/3066/6840/products/eXO_iQ_11_1200x1200.png?v=1574270371)

## HeatPump Z400 iQ

https://www.zodiac.com.au/pool-heaters/heat-pumps/z400

For HA, for this device you need to connect with nodeRED (see Below)
![Z400](https://s3-ap-southeast-2.amazonaws.com/zodiac-au-2/Products/z400-pool-heat-pump/z400-iq-aqua-final.jpg)


# Code

## Home Assistant

Here's the mqtt.yaml code to declare sensors under HA.
Root file to declare in confirguration.yaml if not already done:

File mqtt.yaml

```yaml
sensor:
  - name: "Pool Heat Pump Setpoint"
    state_topic: "pool/heatpump"
    value_template: "{{ value_json.setpoint }}"
    unit_of_measurement: "°C"

  - name: "Pool Heat Pump Water Temperature"
    state_topic: "pool/heatpump"
    value_template: "{{ value_json.water.value }}"
    unit_of_measurement: "°C"

  - name: "Pool Heat Pump Air Temperature"
    state_topic: "pool/heatpump"
    value_template: "{{ value_json.air.value }}"
    unit_of_measurement: "°C"

  - name: "Pool Heat Pump Status"
    state_topic: "pool/heatpump"
    value_template: "{{ value_json.status }}"    

  - name: "Pool Chlorinator pH"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.ph / 10 }}"
    unit_of_measurement: "pH"

  - name: "Pool Chlorinator pH Setpoint"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.ph_setpoint /10 }}"
    unit_of_measurement: "pH"

  - name: "Pool Chlorinator ORP"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.orp }}"
    unit_of_measurement: "mV"

  - name: "Pool Chlorinator ORP Setpoint"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.orp_setpoint }}"
    unit_of_measurement: "mV"

  - name: "Pool Chlorinator Filter Temperature"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.filter_temp }}"
    unit_of_measurement: "°C"

  - name: "Pool Chlorinator Status"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.status }}"
  
  - name: "Pool Chlorinator Error Code"
    state_topic: "pool/chlorinator"
    value_template: "{{ value_json.error_code }}"
```

## Nodered

![nodered](https://forum.hacf.fr/uploads/default/optimized/3X/8/8/8863b7b8db67a2b2acb9cecfb13622974b543d6c_2_690x438.png)

Here is the NodeRed flow code with MQTT part



Topics published are
- pool/chlorinator
- pool/heatpump

Modify these 3 values in the code by supplying your own.


        ***EMAIL***
        ***PASSWORD***
        ***ID DEVICE***

You can do it directly in the code before import or via nodeRED interface, in the third node of each flow.

Copy and Import this code
Then Connect your MQTT with your login and password

```json

[
    {
        "id": "7a045db1b5a9199f",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "1e47a52e3f1755e1",
        "type": "inject",
        "z": "7a045db1b5a9199f",
        "name": "Every hour",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "3540",
        "crontab": "",
        "once": true,
        "onceDelay": "60",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 150,
        "y": 60,
        "wires": [
            [
                "6808aab954fc8b01"
            ]
        ]
    },
    {
        "id": "7849f0c750568181",
        "type": "http request",
        "z": "7a045db1b5a9199f",
        "name": "",
        "method": "use",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "senderr": false,
        "x": 630,
        "y": 60,
        "wires": [
            [
                "18bf3f43ad2e6aa4"
            ]
        ]
    },
    {
        "id": "18bf3f43ad2e6aa4",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "IDToken",
        "rules": [
            {
                "t": "move",
                "p": "payload.userPoolOAuth.IdToken",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 860,
        "y": 60,
        "wires": [
            [
                "ea244732498b9412"
            ]
        ]
    },
    {
        "id": "6808aab954fc8b01",
        "type": "function",
        "z": "7a045db1b5a9199f",
        "name": "Format Post Request",
        "func": "msg.method = 'POST';\nmsg.headers = {};\nmsg.headers['Host'] = 'prod.zodiac-io.com';\nmsg.headers['accept'] = 'application/json';\nmsg.headers['content-type'] = 'application/json';\nmsg.headers['accept-encoding'] = '*';\nmsg.headers['user-agent'] = 'okhttp/3.12.0';\nmsg.url = 'https://prod.zodiac-io.com/users/v1/login';\nmsg.payload = '{\"api_key\":\"EOOEMOW4YR6QNB11\", \"email\":\"***EMAIL***\", \"password\":\"***PASSWORD***\"}';\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 60,
        "wires": [
            [
                "7849f0c750568181"
            ]
        ]
    },
    {
        "id": "ea244732498b9412",
        "type": "function",
        "z": "7a045db1b5a9199f",
        "name": "Set variable IDToken",
        "func": "global.set(\"IDToken\",msg.payload);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1100,
        "y": 60,
        "wires": [
            []
        ]
    },
    {
        "id": "dcd9bc84914a71f6",
        "type": "http request",
        "z": "7a045db1b5a9199f",
        "name": "Chlorinator",
        "method": "use",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "insecureHTTPParser": false,
        "authType": "",
        "senderr": false,
        "headers": [],
        "x": 630,
        "y": 140,
        "wires": [
            [
                "02b59259a14e8461",
                "b8075e9783a1eb4f",
                "f0bb9145a81ce74a",
                "eba07f6046f035d6",
                "4ac01fee0ba334b1",
                "018a8ddf5da0b1f2",
                "9c4298d655076b55",
                "1173333c1f717937"
            ]
        ]
    },
    {
        "id": "9df6c312e595c863",
        "type": "function",
        "z": "7a045db1b5a9199f",
        "name": "Format Get Request",
        "func": "let bearer = global.get(\"IDToken\");\nmsg.method = 'GET';\nmsg.headers = {};\nmsg.headers['Host'] = 'prod.zodiac-io.com';\nmsg.headers['accept'] = 'application/json';\nmsg.headers['authorization'] = bearer;\nmsg.headers['accept-encoding'] = '*';\nmsg.headers['user-agent'] = 'okhttp/3.12.0';\nmsg.url = 'https://prod.zodiac-io.com/devices/v1/***ID DEVICE***/shadow';\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 140,
        "wires": [
            [
                "dcd9bc84914a71f6"
            ]
        ]
    },
    {
        "id": "a56824124abf6deb",
        "type": "inject",
        "z": "7a045db1b5a9199f",
        "name": "Every 10 mins",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "600",
        "crontab": "",
        "once": true,
        "onceDelay": "300",
        "topic": "",
        "payloadType": "date",
        "x": 140,
        "y": 440,
        "wires": [
            [
                "9df6c312e595c863",
                "295782e3c29ee112"
            ]
        ]
    },
    {
        "id": "02b59259a14e8461",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "ORP",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.sns_2.value",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 970,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "b8075e9783a1eb4f",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "pH",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.sns_1.value",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 970,
        "y": 220,
        "wires": [
            [
                "0e3f2e3e62511c3a"
            ]
        ]
    },
    {
        "id": "f0bb9145a81ce74a",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Filter Temp",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.sns_3.value",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 990,
        "y": 540,
        "wires": [
            []
        ]
    },
    {
        "id": "0e3f2e3e62511c3a",
        "type": "range",
        "z": "7a045db1b5a9199f",
        "minin": "0",
        "maxin": "10",
        "minout": "0",
        "maxout": "1",
        "action": "scale",
        "round": false,
        "property": "payload",
        "name": "Divide by 10",
        "x": 1190,
        "y": 220,
        "wires": [
            []
        ]
    },
    {
        "id": "eba07f6046f035d6",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "ORP Setpoint",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.orp_sp",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1000,
        "y": 460,
        "wires": [
            []
        ]
    },
    {
        "id": "4ac01fee0ba334b1",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "pH Setpoint",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.ph_sp",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 990,
        "y": 300,
        "wires": [
            [
                "874e523fa6c7da37"
            ]
        ]
    },
    {
        "id": "874e523fa6c7da37",
        "type": "range",
        "z": "7a045db1b5a9199f",
        "minin": "0",
        "maxin": "10",
        "minout": "0",
        "maxout": "1",
        "action": "scale",
        "round": false,
        "property": "payload",
        "name": "Divide by 10",
        "x": 1190,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "018a8ddf5da0b1f2",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Zodiac Error Code",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.error_code",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1010,
        "y": 620,
        "wires": [
            []
        ]
    },
    {
        "id": "e64f08a15e168247",
        "type": "function",
        "z": "7a045db1b5a9199f",
        "name": "Format Get Request",
        "func": "let bearer = global.get(\"IDToken\");\nmsg.method = 'GET';\nmsg.headers = {};\nmsg.headers['Host'] = 'prod.zodiac-io.com';\nmsg.headers['accept'] = 'application/json';\nmsg.headers['authorization'] = bearer;\nmsg.headers['accept-encoding'] = '*';\nmsg.headers['user-agent'] = 'okhttp/3.12.0';\nmsg.url = 'https://prod.zodiac-io.com/devices/v1/***ID DEVICE***/shadow';\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 820,
        "wires": [
            [
                "c6ca1d3e24bfb92e"
            ]
        ]
    },
    {
        "id": "c6ca1d3e24bfb92e",
        "type": "http request",
        "z": "7a045db1b5a9199f",
        "name": "Heat Pump",
        "method": "use",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "insecureHTTPParser": false,
        "authType": "",
        "senderr": false,
        "headers": [],
        "x": 630,
        "y": 820,
        "wires": [
            [
                "8b1cfc1cd0be14da",
                "3c3f9237065a8ad6",
                "5c21887674341499",
                "98851fd84020e5da",
                "5df5ed4f4d40d4ef",
                "b1a1ad6ac80a85db"
            ]
        ]
    },
    {
        "id": "295782e3c29ee112",
        "type": "delay",
        "z": "7a045db1b5a9199f",
        "name": "5 mins",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "minutes",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 350,
        "y": 440,
        "wires": [
            [
                "e64f08a15e168247"
            ]
        ]
    },
    {
        "id": "8b1cfc1cd0be14da",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Heat Pump Setpoint",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.tsp",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1000,
        "y": 1220,
        "wires": [
            []
        ]
    },
    {
        "id": "5c21887674341499",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Heap Pump Air Temp",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.sns_2.value",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1000,
        "y": 980,
        "wires": [
            []
        ]
    },
    {
        "id": "3c3f9237065a8ad6",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Heap Pump Water Temp",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.sns_1.value",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1010,
        "y": 900,
        "wires": [
            []
        ]
    },
    {
        "id": "17a5e515d5f4c27f",
        "type": "inject",
        "z": "7a045db1b5a9199f",
        "name": "Test only",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payloadType": "date",
        "x": 140,
        "y": 820,
        "wires": [
            [
                "e64f08a15e168247"
            ]
        ]
    },
    {
        "id": "98851fd84020e5da",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Heat Pump Status",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.status",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 990,
        "y": 1060,
        "wires": [
            []
        ]
    },
    {
        "id": "5df5ed4f4d40d4ef",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Heat Pump Reason",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.reason",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 990,
        "y": 1140,
        "wires": [
            []
        ]
    },
    {
        "id": "9c4298d655076b55",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Low Setting",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.low",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 990,
        "y": 700,
        "wires": [
            []
        ]
    },
    {
        "id": "026203a8fc2a8012",
        "type": "mqtt out",
        "z": "7a045db1b5a9199f",
        "name": "",
        "topic": "pool/heatpump",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "e13bcbdbba3a0ad1",
        "x": 1220,
        "y": 820,
        "wires": []
    },
    {
        "id": "b1a1ad6ac80a85db",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Heat Pump JSON HA",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.tsp",
                "pt": "msg",
                "to": "payload.setpoint",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.sns_1",
                "pt": "msg",
                "to": "payload.water",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.sns_2",
                "pt": "msg",
                "to": "payload.air",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.status",
                "pt": "msg",
                "to": "payload.status",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.reason",
                "pt": "msg",
                "to": "payload.reason",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.hp_0.state",
                "pt": "msg",
                "to": "payload.state",
                "tot": "msg"
            },
            {
                "t": "delete",
                "p": "payload.state",
                "pt": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 920,
        "y": 820,
        "wires": [
            [
                "026203a8fc2a8012",
                "291c210e0379a5ca"
            ]
        ]
    },
    {
        "id": "1173333c1f717937",
        "type": "change",
        "z": "7a045db1b5a9199f",
        "name": "Chlorinator JSON HA",
        "rules": [
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.sns_1.value",
                "pt": "msg",
                "to": "payload.ph",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.ph_sp",
                "pt": "msg",
                "to": "payload.ph_setpoint",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.sns_2.value",
                "pt": "msg",
                "to": "payload.orp",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.orp_sp",
                "pt": "msg",
                "to": "payload.orp_setpoint",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.sns_3.value",
                "pt": "msg",
                "to": "payload.filter_temp",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.exo_state",
                "pt": "msg",
                "to": "payload.status",
                "tot": "msg"
            },
            {
                "t": "move",
                "p": "payload.state.reported.equipment.swc_0.error_code",
                "pt": "msg",
                "to": "payload.error_code",
                "tot": "msg"
            },
            {
                "t": "delete",
                "p": "payload.state",
                "pt": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 940,
        "y": 140,
        "wires": [
            [
                "26d521ac2ba4cbda",
                "4007320216a37e59"
            ]
        ]
    },
    {
        "id": "26d521ac2ba4cbda",
        "type": "debug",
        "z": "7a045db1b5a9199f",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1300,
        "y": 100,
        "wires": []
    },
    {
        "id": "2d03d44bbe7e7298",
        "type": "inject",
        "z": "7a045db1b5a9199f",
        "name": "Test only",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payloadType": "date",
        "x": 160,
        "y": 140,
        "wires": [
            [
                "9df6c312e595c863"
            ]
        ]
    },
    {
        "id": "4007320216a37e59",
        "type": "mqtt out",
        "z": "7a045db1b5a9199f",
        "name": "",
        "topic": "pool/chlorinator",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "e13bcbdbba3a0ad1",
        "x": 1320,
        "y": 140,
        "wires": []
    },
    {
        "id": "291c210e0379a5ca",
        "type": "debug",
        "z": "7a045db1b5a9199f",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1200,
        "y": 780,
        "wires": []
    },
    {
        "id": "e13bcbdbba3a0ad1",
        "type": "mqtt-broker",
        "name": "MQTT HA",
        "broker": "***MQTT URL***",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    }
]

```
