const auth = (fuel: number) => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]) {
      if ((this as any).fuel > fuel) {
        originalMethod.apply(this, args);
      } else {
        console.log("Not enough fuel!");
      }
    };
  
    return descriptor;
  }; 
    

export class HighlighterCard{
    constructor(){

    }

    fuel = 50;
    
    @auth(100)
    greet(v: string){
        console.log(v)
    }

}

const a = new HighlighterCard();
a.greet("ram ram")