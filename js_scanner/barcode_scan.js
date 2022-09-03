window.addEventListener('load', function () {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserBarcodeReader()
    console.log('ZXing code reader initialized')
    codeReader.getVideoInputDevices()
        .then((videoInputDevices) => {
            const sourceSelect = document.getElementById('sourceSelect')
            selectedDeviceId = videoInputDevices[0].deviceId
            if (videoInputDevices.length > 1) {
                videoInputDevices.forEach((element) => {
                    const sourceOption = document.createElement('option')
                    sourceOption.text = element.label
                    sourceOption.value = element.deviceId
                    sourceSelect.appendChild(sourceOption)
                })

                sourceSelect.onchange = () => {
                    selectedDeviceId = sourceSelect.value;
                    codeReader.reset();
                }

                const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                sourceSelectPanel.style.display = 'block'
            }

            document.getElementById('startButton').addEventListener('click', () => {
                const cam = document.getElementById('camDiv')
                cam.style.display = 'block'

                codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'video').then((result) => {
                    console.log(result)
                    document.getElementById('result').textContent = result.text;
                    document.getElementById('seq').value = result.text;
                    codeReader.reset();
                    const cam = document.getElementById('camDiv')
                    cam.style.display = 'none'
                }).catch((err) => {
                    console.error(err)
                    //document.getElementById('result').textContent = err
                })
                console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
            })

            document.getElementById('resetButton').addEventListener('click', () => {
                const cam = document.getElementById('camDiv')
                cam.style.display = 'none'
                document.getElementById('result').textContent = result.text;
                document.getElementById('seq').value = '';
                codeReader.reset();
                console.log('Reset.')
            })

        })
        .catch((err) => {
            console.error(err)
        })
})