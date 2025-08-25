TypeScript
interface IoTDevice {
  id: string;
  name: string;
  status: string; // online | offline
  lastUpdate: Date;
  metrics: {
    temperature?: number;
    humidity?: number;
    pressure?: number;
  };
}

interface IoTDeviceMonitorOptions {
  devices: IoTDevice[];
  refreshInterval: number; // in milliseconds
}

class IoTDeviceMonitor {
  private devices: IoTDevice[];
  private refreshInterval: number;
  private timer: NodeJS.Timeout;

  constructor(options: IoTDeviceMonitorOptions) {
    this.devices = options.devices;
    this.refreshInterval = options.refreshInterval;
  }

  start() {
    this.timer = setInterval(async () => {
      await this.updateDevices();
    }, this.refreshInterval);
  }

  stop() {
    clearInterval(this.timer);
  }

  private async updateDevices() {
    // implement logic to fetch latest data from IoT devices
    for (const device of this.devices) {
      const data = await fetch(`https://example.com/api/${device.id}`);
      const metrics = await data.json();
      device.metrics = metrics;
      device.lastUpdate = new Date();
    }
  }

  getDevices() {
    return this.devices;
  }
}

const monitorOptions: IoTDeviceMonitorOptions = {
  devices: [
    {
      id: 'device-1',
      name: 'Temperature Sensor',
      status: 'online',
      lastUpdate: new Date(),
      metrics: {
        temperature: 25.5,
      },
    },
    {
      id: 'device-2',
      name: 'Humidity Sensor',
      status: 'online',
      lastUpdate: new Date(),
      metrics: {
        humidity: 60,
      },
    },
  ],
  refreshInterval: 60000, // 1 minute
};

const monitor = new IoTDeviceMonitor(monitorOptions);
monitor.start();