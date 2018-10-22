 Plugin for [Mobius1/Selectable](https://github.com/Mobius1/Selectable) that enables fast column and / or row selection / deselection.

 # [Demo](https://s.codepen.io/Mobius1/debug/XxBQOa/yokZEWDmzaeA)
 
 ### Enable Plugin
 
 Add the `[data-selectable="column"]` attribute to the required `th` cells you want to enable
 Add the `[data-selectable="row"]` attribute to the required column cells to enable row selection
 Add the `[data-selectable="all"]` to a cell to enable selection / deselection of all cells.
 
  ```html
  <table>
    <thead>
      <tr>
        <th data-selectable="all"></th> <!-- select all -->
        <th data-selectable="column">Heading 1 Title</th> <!-- select column -->
        <th data-selectable="column">Heading 2 Title</th> <!-- select column -->
        <th data-selectable="column">Heading 3 Title</th> <!-- select column -->
        <th data-selectable="column">Heading 4 Title</th> <!-- select column -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-selectable="row">Row Title</td> <!-- select row -->
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
        <td>Cell 4</td>
      </tr>
      ...
    </tbody>
  </table>
 ```
 
 Make sure the plugin is included AFTER Selectable:
 
 ```html
 <script src="path/to/selectable.min.js"></script>
 <script src="path/to/selectable.table.min.js"></script>
 ```
 
then:
 
 ```javascript
 // instantiate Selectable
 const selectable = new Selectable();
 
 // enable the table plugin
 selectable.table();
 ```
 
 That's it!
 
  # [Demo](https://s.codepen.io/Mobius1/debug/XxBQOa/yokZEWDmzaeA)
  
  ---
  
  Copyright © 2017 Karl Saunders | BSD & MIT license