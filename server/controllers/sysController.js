module.exports = {
    getSystemInfo(req, res) {
        // For quick listing computers on the app
        const si = require('systeminformation')
        let systemInfo = { 
            make: "",
            model: "",
            serial: "",
            sku: "",
            processor: {
                make: "",
                model: "",
                vendor: "",
                cores: null
            },
            memory: [],
            battery: {},
            disks: [],
            graphics: []
        }

        // Get the base model info
        si.system().then((data) => {
           systemInfo.make = data.manufacturer
           systemInfo.model = data.model
           systemInfo.serial = data.serial
           systemInfo.sku = data.sku

        }).catch(error => console.error(error))

        // Get the cpu info
        si.cpu().then((data) => {
            systemInfo.processor = {
                make: data.manufacturer,
                model: data.brand,
                vendor: data.vendor,
                cores: data.cores
            }
        }).catch(error => console.error(error))

        si.memLayout().then((data) => {
            for (let i = 0; i < data.length; i++ ) {
                systemInfo.memory.push({
                    // Convert size into GB
                    size: Math.trunc(data[i].size / 1000000000),
                    type: data[i].type,
                    clockSpeed: data[i].clockSpeed,
                    manufacturer: data[i].manufacturer
                })
            }
        }).catch(error => console.error(error))

        si.battery().then((data) => {
            if (data.hasbattery === true) {
                systemInfo.battery = {
                    type: data.type,
                    model: data.model,
                    max: data.maxcapacity,
                    make: data.manufacturer
                }
            } 
        }).catch(error => console.error(error))

        si.diskLayout().then((data) => {
           for (let i = 0; i < data.length; i++){
               systemInfo.disks.push({
                   device: data[i].device,
                   type: data[i].type,
                   name: data[i].name,
                   size: Math.trunc(data[i].size / 1000000000)
               })
           }
           res.status(200).send(systemInfo)
        }).catch(error => console.log(error))

        si.graphics().then((data) => {
            for (let i = 0; i < data.controllers.length; i++) {

                if (data.controllers[i].model !== '')
                systemInfo.graphics.push({
                    vendor: data.controllers[i].vendor,
                    model: data.controllers[i].model,
                    vram: data.controllers[i].vram
                })
            }
            
        }).catch(error => console.error(error))

        
    }



}