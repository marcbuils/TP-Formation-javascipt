var _ = require('lodash');

var Vehicule = null;
var Voiture = null;
var uneVoiture = null;

// Initialisation de Vehicule
Vehicule = Object.create(null);
_.extend(Vehicule, {
    distance : 0,
    avance : function () { return this; },
    recule : function () { return this; },
    getDistance : function () {
        return this.distance;
    }
});

// Initialisation de Voiture
Voiture = Object.create(Vehicule);
_.extend(Voiture, {
    avance: function (temps) {
        this.distance += temps*50 ; // La voiture roule à 50km
        return this;
    },

    recule: function (temps) {
        this.distance -= temps*20 ; // La voiture recule à 20km
        return this;
    }
});

Vehicule.getDistance = function () {
    return 1000 + this.distance;
}

// Initialisation d'une instance de voiture
uneVoiture = Object.create(Voiture);
console.log(
    "La voiture a roulée %d km",
    uneVoiture
        .avance(1)
        .avance(2)
        .recule(1)
        .getDistance()
); // Affiche "La voiture a roulée 130 km" (1*50 + 2*50 – 1*20)
