## Colour Spectrum in a Grid

### colorMode()
In this sketch, the HSB (Hue, Saturation, Brightness) colour scale is used. HSB allows more control over the desired colour. The hue value is set to the width of the canvas. This will allow the colours to span across the canvas. The saturation value is set to the height of the canvas. The colours will decrease in saturation as they are drawn in the y direction.

```javascript
colorMode(HSB, width, height, 100);
```

### contrain()
mousex and mouseY are key words in P5.js. They output the x and y location of the mouse in relation to the canvas. 
In order to make sure that the output of the mouseX and mouseY is controlled, they are both constrained using the constrain() function.

```javascript
constrain(mouseY, 0, width);
```

### map()
In this sketch, the map() function is used to output a desired number in a range. The map() function in this sketch is used on the mouseX and mouseY to output values from 10 - 100. These values are then stored in variables called tileCountX and tileCountY. These variables are used to determine the amount of rectangles that are drawn on the canvas.

```javascript
map(mouseY, 0, width, 10, 100);
```

### for loop
In order to populate the canvas, a nested for loop is needed. One to handle the y direction and one for the x direction. The amount of rectangles to be drawn is determined by the position of the mouse. The height and width of each rectangle is calculated by dividing the amount of rectangles by the width and height (var tileHeight = height / tileCountY, var tileWidth = width / tileCountX).

```javascript
for (var gridY = 0; gridY < height; gridY += tileHeight) {
    for (var gridX = 0; gridX < width; gridX += tileWidth) {
    }
  }
```

### fill()
The fill() function is used to colour elements. It should be called before the element that is to be coloured. The hue value is calculated by subtracting the current position of gridY from the height of the canvas. This is done to have the colours at the top of the canvas highly saturated.

```javascript
fill(gridX, height - gridY, 100);

rect(gridX, gridY, tileWidth, tileHeight);
```
Follow the link below to see the sketch in action

[Demo](https://cilliantighe.github.io/Creative_Coding_GD/01_colour/02_colour_spectrum_in_a_grid/)

Return to colour section
[&lt;---](https://github.com/cilliantighe/Creative_Coding_GD/tree/master/01_colour)
