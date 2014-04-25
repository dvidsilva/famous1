/*globals define*/
define(function(require, exports, module) {
    'use strict';
     // import dependencies
    var Engine = require('famous/core/Engine');
    var Transform     = require('famous/core/Transform');
    var Surface       = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var InputSurface = require('famous/surfaces/InputSurface');
    // var Modifier = require('famous/modifiers/modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable = require('famous/transitions/transitionable');
    var Easing        = require('famous/transitions/Easing');
    var Lightbox      = require('famous/views/Lightbox');
    var SpringTransition = require('famous/transitions/SpringTransition');
    var WallTransition = require('famous/transitions/WallTransition');
    var SnapTransition = require('famous/transitions/SnapTransition');
    //var DeviceView = require('./DeviceView');
    Transitionable.registerMethod('spring', SpringTransition);
    Transitionable.registerMethod('wall', WallTransition);
    Transitionable.registerMethod('snap', SnapTransition);

    var device;
    var lightbox;
    var slides = [];
    var index = 0;
    var lightboxOptions = {
      inOpacity: 1,
      outOpacity: 1,
      inTransform: Transform.translate(320,0, 0),
      outTransform: Transform.translate(-320, 0, 1),
      inTransition: { duration: 400, curve: Easing.outBack },
      outTransition: { duration: 150, curve: Easing.easeOut }
    };

    function createSlides() {
      var slideContent = [
        '<h1>Hola Soy david</h1><img src="http://placekitten.com/200/300" />',
        '<h1>Hola Soy un segundo slide</h1><img src="http://placekitten.com/210/210" />',
        '<h1>Hola Soy el tercer slide</h1><img src="http://placekitten.com/200/200" />'
      ];
      var background = new Surface({
        properties: {
          backgroundColor: '#FA5C4F'
        }
      });

      mainContext.add(background);

      for (var i = 0; i < slideContent.length; i++) {
        var slide = new Surface({
          content: slideContent[i],
          properties: {
            color: 'white',
            lineHeight: '200%',
            textAlign: 'center',
            fontSize: '36px',
            cursor: 'pointer'
          }
        });

        slide.on('click', showNextSlide);

        slides.push(slide);
      }
    }

    function createLightbox() {
      lightbox = new Lightbox(lightboxOptions);
      mainContext.add(lightbox);
      lightbox.show(slides[0]);
    }

    function showNextSlide() {
      index++;
      if (index >= slides.length) index = 0;
      lightbox.show(slides[index]);
    }

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var logo = new ImageSurface({
        size: [250, 250],
        content: 'content/images/famous_logo.png'
    });

    createSlides();
    createLightbox();
});
