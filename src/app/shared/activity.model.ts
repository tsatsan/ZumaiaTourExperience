export class Activity {
    id: number;
    name: string;
    description: string;
    image: string;
    tipo: string;
    unlevenless: string;
    time: string;
    distance: string;
    gpxData: string;
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    };
constructor(

    name: string,
    description: string,
    image: string,
    tipo: string,
    unlevenless: string,
    time: string,
    distance: string,
    gpxData: string,
) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.tipo = tipo;
    this.unlevenless = unlevenless;
    this.time = time;
    this.distance =  distance;
    this.gpxData = gpxData;
   }
}

