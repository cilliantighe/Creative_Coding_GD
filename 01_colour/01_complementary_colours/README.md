## Complementary Colours

### colorMode()
In this sketch, the HSB (Hue, Saturation, Brightness) colour scale is used. HSB allows more control over the desired colour. 

```javascript
colorMode(HSB, 360, 100, 100);
```

### contrain()
mousex and mouseY are key words in P5.js. They output the x and y location of the mouse in relation to the canvas. 
In order to make sure that the output of the mouseX and mouseY are controlled, they are both constrained using the constrain() function.

```javascript
constrain(mouseY, 0, width);
```

### map()
In this sketch, the map() function is used to output a number from a range. The map() function in this sketch is used on the mouseX and mouseY to output values from 0 - 360. The reason for this is that we set the hue range to 360 in the setup. This means that there are 360 colours to output. The outputted value is then stored in a variable (yPos, xPos).

```javascript
map(mouseY, 0, width, 0, 360);
```

### background()
The background() function is used to colour the background of the canvas. The yPos value is passed into this function to change the colour. The colour changes as the mouse is moves in the y direction

```javascript
background(yPos, 100, 100);
```

### fill()
The fill() function is used to colour elements. It should be called before the element that is to be coloured. '360 - yPos' is passed into this function to display the inverse of the colour that's being displayed on the background.

```javascript
fill(360-yPos, 100, 100);
```
Follow the link below to see the sketch in action

[Demo](https://cilliantighe.github.io/Creative_Coding_GD/01_colour/01_complementary_colours/)

Return to colour section
[&lt;---](https://github.com/cilliantighe/Creative_Coding_GD/tree/master/01_colour)
