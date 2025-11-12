/**
 * Facade Pattern Example: Home Theater System
 *
 * The Facade Pattern provides a simplified interface to a complex subsystem.
 * In this example, we create a HomeTheaterFacade that simplifies the interaction
 * with various components of a home theater system.    
 */

// Subsystem classes
class DVDPlayer {
  on() { console.log("DVD Player on"); }
  play(movie: string) { console.log(`Playing "${movie}"`); }
  off() { console.log("DVD Player off"); }
}

class Projector {
  on() { console.log("Projector on"); }
  wideScreenMode() { console.log("Projector in widescreen mode"); }
  off() { console.log("Projector off"); }
}

class Lights {
  dim(level: number) { console.log(`Lights dimmed to ${level}%`); }
  on() { console.log("Lights on"); }
}

// Facade
class HomeTheaterFacade {
  constructor(
    private dvd: DVDPlayer,
    private projector: Projector,
    private lights: Lights
  ) {}

  watchMovie(movie: string) {
    console.log("Get ready to watch a movie...");
    this.lights.dim(10);
    this.projector.on();
    this.projector.wideScreenMode();
    this.dvd.on();
    this.dvd.play(movie);
  }

  endMovie() {
    console.log("Shutting movie theater down...");
    this.lights.on();
    this.projector.off();
    this.dvd.off();
  }
}

// Client
const dvd = new DVDPlayer();
const projector = new Projector();
const lights = new Lights();

const homeTheater = new HomeTheaterFacade(dvd, projector, lights);
homeTheater.watchMovie("Inception");
homeTheater.endMovie();
