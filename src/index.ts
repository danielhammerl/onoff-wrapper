import { BinaryValue, Direction, Edge, Gpio as OriginalGpio, Options, ValueCallback } from 'onoff';

const OFF = OriginalGpio.LOW;
const ON = OriginalGpio.HIGH;

export * from 'onoff';

export function Gpio(gpio: number, direction: Direction, edge?: Edge, options?: Options): OriginalGpio {
  if (process.env.NODE_ENV === 'production') {
    const gpioInstance = new OriginalGpio(gpio, direction, edge, options);
    gpioInstance.writeSync(OFF);
    return gpioInstance;
  } else {
    console.log(`Gpio created with following parameters: ${Object.values(arguments).join(', ')}`);
    return {
      activeLow(): boolean {
        console.log(`activeLow mock called`);
        return true;
      },
      direction(): Direction {
        console.log(`direction mock called`);
        return 'out';
      },
      edge(): Edge {
        console.log(`edge mock called`);
        return 'none';
      },
      read(callback?: ValueCallback): any {
        console.log(`read mock called`);
      },
      readSync(): BinaryValue {
        console.log(`readSync mock called`);
        return ON;
      },
      setActiveLow(invert: boolean): void {
        console.log(`setActiveLow mock called with invert: ${invert}`);
      },
      setDirection(direction: Direction): void {
        console.log(`setDirection mock called with direction: ${direction}`);
      },
      setEdge(edge: Edge): void {
        console.log(`setEdge mock called with edge: ${edge}`);
      },
      unexport(): void {
        console.log(`unexport mock called`);
      },
      unwatch(callback?: ValueCallback): void {
        console.log(`unwatch mock called`);
      },
      unwatchAll(): void {
        console.log(`unwatchAll mock called`);
      },
      watch(callback: ValueCallback): void {
        console.log(`watch mock called`);
      },
      write(value: BinaryValue, callback?: (err: Error | null | undefined) => void): any {
        console.log(`write mock called with ${value === ON ? 'ON' : 'OFF'}`);
      },
      writeSync: (signal: BinaryValue) => {
        console.log(`writeSync mock called with ${signal === ON ? 'ON' : 'OFF'}`);
      },
    };
  }
}

export { ON, OFF };
