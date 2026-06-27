import { useState, useEffect } from 'react';
import { 
  Monitor, Smartphone, Globe, MapPin, Wifi, Clock, 
  Battery, BatteryCharging, Cpu, HardDrive, Network 
} from 'lucide-react';

const DeviceInfo = () => {
  const [deviceData, setDeviceData] = useState({
    ip: 'Loading...',
    city: 'Loading...',
    country: 'Loading...',
    isp: 'Loading...',
    browser: '',
    os: '',
    deviceType: '',
    screen: '',
    time: '',
    battery: 'Checking...',
    charging: false,
    cores: 0,
    memory: 'Checking...',
    connection: 'Unknown',
    language: '',
    timezone: '',
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    const browser = ua.match(/(Chrome|Firefox|Safari|Edge|Opera)/)?.[0] || 'Unknown';
    const os = ua.match(/(Windows|Mac|Linux|Android|iOS)/)?.[0] || 'Unknown';
    const isMobile = /Mobile|Android|iPhone/i.test(ua);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';
    const screen = `${window.screen.width} × ${window.screen.height}`;
    const cores = navigator.hardwareConcurrency || 0;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const memory = (navigator as any).deviceMemory 
      ? `${(navigator as any).deviceMemory} GB` 
      : 'Not available';
    const connection = (navigator as any).connection?.effectiveType || 'Unknown';

    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        const ip = data.ip;
        fetch(`https://ipapi.co/${ip}/json/`)
          .then(res => res.json())
          .then(locData => {
            setDeviceData(prev => ({
              ...prev,
              ip,
              city: locData.city || 'Unknown',
              country: locData.country_name || 'Unknown',
              isp: locData.org || 'Unknown',
              browser,
              os,
              deviceType,
              screen,
              time: new Date().toLocaleString(),
              cores,
              memory,
              connection,
              language,
              timezone,
            }));
          })
          .catch(() => {
            setDeviceData(prev => ({ 
              ...prev, 
              ip, 
              browser, 
              os, 
              deviceType, 
              screen, 
              time: new Date().toLocaleString(),
              cores,
              memory,
              connection,
              language,
              timezone,
            }));
          });
      })
      .catch(() => {
        setDeviceData(prev => ({ 
          ...prev, 
          browser, 
          os, 
          deviceType, 
          screen, 
          time: new Date().toLocaleString(),
          cores,
          memory,
          connection,
          language,
          timezone,
        }));
      });

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          const level = Math.round(battery.level * 100);
          const charging = battery.charging;
          setDeviceData(prev => ({ 
            ...prev, 
            battery: `${level}%`,
            charging 
          }));
        };
        
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch(() => {
        setDeviceData(prev => ({ ...prev, battery: 'Not available' }));
      });
    } else {
      setDeviceData(prev => ({ ...prev, battery: 'Not supported' }));
    }

    const timer = setInterval(() => {
      setDeviceData(prev => ({ ...prev, time: new Date().toLocaleString() }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const infoItems = [
    { icon: Globe, label: 'IP Address', value: deviceData.ip },
    { icon: MapPin, label: 'Location', value: `${deviceData.city}, ${deviceData.country}` },
    { icon: Network, label: 'ISP', value: deviceData.isp },
    { icon: deviceData.deviceType === 'Mobile' ? Smartphone : Monitor, label: 'Device', value: deviceData.deviceType },
    { icon: Wifi, label: 'Browser', value: `${deviceData.browser} on ${deviceData.os}` },
    { icon: Monitor, label: 'Screen', value: deviceData.screen },
    { icon: Cpu, label: 'CPU Cores', value: deviceData.cores.toString() },
    { icon: HardDrive, label: 'Memory', value: deviceData.memory },
    { icon: Network, label: 'Connection', value: deviceData.connection },
    { icon: Globe, label: 'Language', value: deviceData.language },
    { icon: Clock, label: 'Timezone', value: deviceData.timezone },
    { icon: Clock, label: 'Local Time', value: deviceData.time },
    { icon: deviceData.charging ? BatteryCharging : Battery, label: 'Battery', value: deviceData.battery },
  ];

  return (
    <section id="device-info" className="relative px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4 tracking-wider">
            Live Device Information
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary mb-4" />
          <p className="text-lg text-muted-foreground tracking-wide">
            Real-time information about your device and connection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="group gradient-border p-6 hover:glow-primary transition-all duration-300"
              style={{ animation: `fade-in 0.5s ease-out ${index * 0.05}s both` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-lg font-semibold text-foreground truncate">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceInfo;
