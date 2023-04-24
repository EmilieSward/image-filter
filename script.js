var image = null
var imageGray = null
var imageRed = null
var imageFilm = null
var imageSepia = null
var imageRainbow = null
var imageBlur = null
// var imageFlipped = null
var canvas = null

function uploadImage() {
  var fileimage = document.getElementById("image");
  canvas = document.getElementById("canvas");
  image = new SimpleImage(fileimage);
  imageGray = new SimpleImage(fileimage);
  imageRed = new SimpleImage(fileimage);
  imageFilm = new SimpleImage(fileimage);
  imageSepia = new SimpleImage(fileimage);
  imageRainbow = new SimpleImage(fileimage);
  imageBlur = new SimpleImage(fileimage);
  // imageFlipped = new SimpleImage(fileimage);
  image.drawTo(canvas)

}


function doGray() {
  if (image != null) {
    for (var pixel of imageGray.values()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
    imageGray.drawTo(canvas)
  }
}

function doRed() {
  if (image != null) {
    for (var pixel of imageRed.values()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }
      else {
        pixel.setRed(255);
        pixel.setGreen((avg * 2) - 255);
        pixel.setBlue((avg * 2) - 255);
      }

    }
    imageRed.drawTo(canvas)
  }

}

function doFilm() {
  if (image != null) {
    for (var pixel of imageFilm.values()) {
      var red = pixel.getRed()
      var blue = pixel.getBlue()
      pixel.setRed(red + 20)
      pixel.setBlue(blue - 40)
    }
    imageFilm.drawTo(canvas)
  }
}

function doSepia() {
  if (image != null) {
    for (var pixel of imageSepia.values()) {
      var red = pixel.getRed()
      var blue = pixel.getBlue()
      var green = pixel.getGreen()
      pixel.setRed(red + 20)
      pixel.setGreen(green - 10)
      pixel.setBlue(blue - 30)
    }
    imageSepia.drawTo(canvas)
  }
}

function doRainbow() {
  if (image != null) {
    var h = imageRainbow.getHeight()
    for (var pixel of imageRainbow.values()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      var y = pixel.getY()
      // red section
      if (y < (1 / 7) * h) {
        if (avg < 128) {
          pixel.setRed(2 * avg)
          pixel.setGreen(0)
          pixel.setBlue(0)
        }
        else {
          pixel.setRed(255)
          pixel.setGreen((2 * avg) - 255)
          pixel.setBlue((2 * avg) - 255)
        }
      }
      // orange section
      else if (y < (2 / 7) * h) {
        if (avg < 128) {
          pixel.setRed(2 * avg)
          pixel.setGreen(0.8 * avg)
          pixel.setBlue(0)
        }
        else {
          pixel.setRed(255)
          pixel.setGreen((1.2 * avg) - 51)
          pixel.setBlue((2 * avg) - 255)
        }
      }
      // yellow section
      else if (y < (3 / 7) * h) {
        if (avg < 128){
          pixel.setRed(2 * avg)
          pixel.setGreen(2 * avg)
          pixel.setBlue(0)
        }
        else {
          pixel.setRed(255)
          pixel.setGreen(255)
          pixel.setBlue((2 * avg) - 255)
        }
      }
      // green section
      else if (y < (4 / 7) * h) {
        if (avg < 128){
          pixel.setRed(0)
          pixel.setGreen(2 * avg)
          pixel.setBlue(0)
        }
        else {
          pixel.setRed((2 * avg) - 255)
          pixel.setGreen(255)
          pixel.setBlue((2 * avg) - 255)
        }
      }
      // blue section
      else if (y < (5 / 7) * h) {
        if (avg < 128){
          pixel.setRed(0)
          pixel.setGreen(0)
          pixel.setBlue(2 * avg)
        }
        else {
          pixel.setRed((2 * avg) - 255)
          pixel.setGreen((2 * avg) - 255)
          pixel.setBlue(255)
        }
      }
      // indigo section
      else if (y < (6 / 7) * h) {
        if (avg < 128){
          pixel.setRed(0.8 * avg)
          pixel.setGreen(0)
          pixel.setBlue(2 * avg)
        }
        else {
          pixel.setRed((1.2 * avg) - 25)
          pixel.setGreen((2 * avg) - 255)
          pixel.setBlue(255)
        }
      }
      // violet section
      else {
        if (avg < 128){
          pixel.setRed(1.6 * avg)
          pixel.setGreen(0)
          pixel.setBlue(1.6 * avg)
        }
        else {
          pixel.setRed((0.4 * avg) + 153)
          pixel.setGreen((2 * avg) - 255)
          pixel.setBlue((0.4 * avg) + 153)
        }
      }
    }

  }
    imageRainbow.drawTo(canvas)
}

function doBlur() {
  output = new SimpleImage(imageBlur.getWidth(), imageBlur.getHeight());
  var w = imageBlur.getWidth();
  let h = imageBlur.getHeight();
  for (var pixel of imageBlur.values()) {
    let randomNumber = Math.random()
    var x = pixel.getX();
    var y = pixel.getY();
    if (randomNumber < 0.5) {
      var samePixel = imageBlur.getPixel(x, y);
      output.setPixel(x, y, samePixel)
    } else {
      let randomShiftX = Math.floor(Math.random() * 10) - 5
      let randomShiftY = Math.floor(Math.random() * 10) - 5
      // Get a valid random x
      let newX = x + randomShiftX
      while (newX < 0 || newX >= w) {
        newX = x - randomShiftX
      }
      //Get a valid random y
      let newY = y + randomShiftY
      while (newY < 0 || newY >= h) {
        newY = y - randomShiftY
      }
      // Get the pixel from the original image of random x and random y
      var newPixel = imageBlur.getPixel(newX, newY)
      output.setPixel(x, y, newPixel)
    }
  }
  output.drawTo(canvas)
}


// function doFlip() {
//   if (imageFlipped != null) {
//     let w = imageFlipped.getWidth()
//     let h = imageFlipped.getHeight()
//     for (let x = 0 ; x < Math.floor(w/2) ; x++) {
//       for (let y = 0 ; y < h ; y++) {
//         let originalPixel = imageFlipped.getPixel(x, y)
//         let oppositePixel = imageFlipped.getPixel(w - x - 1, y)
//         let originalRed = originalPixel.getRed()
//         let originalGreen = originalPixel.getGreen()
//         let originalBlue = originalPixel.getBlue()
//         originalPixel.setRed(oppositePixel.getRed())
//         originalPixel.setGreen(oppositePixel.getGreen())
//         originalPixel.setBlue(oppositePixel.getBlue())
//         oppositePixel.setRed(originalRed)
//         oppositePixel.setGreen(originalGreen)
//         oppositePixel.setBlue(originalBlue)
//       }
//     }
//     imageFlipped.drawTo(canvas)
//   }
// }

// var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
//    for (var pixel of fgimage.values()) {
//      if(pixel.getGreen() > (pixel.getRed() + pixel.getBlue())) {
//         var x = pixel.getX();
//         var y = pixel.getY();
//         var bgPixel = bgimage.getPixel(x, y);
//         output.setPixel(x, y, bgPixel);
//      }
//      else {
//         output.setPixel(pixel.getX(), pixel.getY(), pixel);
//      }
//    }
//   }
//   var canvas = document.getElementById("can");
//   output.drawTo(canvas);
//   var canvas1 = document.getElementById("can2");
//   var context1 = canvas1.getContext("2d");
//   context1.clearRect(0,0,canvas1.width,canvas1.height)
// }



function doReset() {
  if (image != null) {
    var fileimage = document.getElementById("image");
    canvas = document.getElementById("canvas");
    image = new SimpleImage(fileimage);
    imageGray = new SimpleImage(fileimage);
    imageRed = new SimpleImage(fileimage);
    imageFilm = new SimpleImage(fileimage);
    imageSepia = new SimpleImage(fileimage);
    imageRainbow = new SimpleImage(fileimage);
    image.drawTo(canvas)
  }

}