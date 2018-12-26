/*!
 *
 * Selectable Table Plugin
 * Copyright (c) 2018 Karl Saunders
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Plugin for https://github.com/Mobius1/Selectable that enables fast column and / or row selection / deselection.
 *
 * Add the '[data-selectable="column"]' attribute to the THEAD cells to enable column selection / deselection
 * Add the '[data-selectable="row"]' attribute to the first column cells to enable row selection / deselection
 * Add the '[data-selectable="all"]' to a cell to enable selection / deselection of all cells.
 *
 * Version: 0.0.3
 *
 */
(() => {
    function initSelectableTable(Selectable) {
        Selectable.prototype.table = function(table) {
            // version check
            const v = this.version.split(".").map(s => parseInt(s, 10));

            if (v[0] < 1 && v[1] < 14) {
                return console.warn(
                    "The table plugin requires Selectable v0.14.0 and above."
                );
            }

            // get the table
            if (table === undefined) {
                table = this.get(0).node.closest("table");
            }

            if (table) {
                const columns = table.tHead.rows[0].cells;
                const rows = Array.from(table.tBodies[0].rows);

                // update the 'selected' attribute on the th / td cell
                const update = e => {
                    const td = e.target.closest("td");
                    const th = e.target.closest("th");
                    let counter = 0;

                    // check column cells and update TH selected attribute
                    if (th && th.dataset.selectable === "column") {
                        for (let i = 0; i < rows.length; i++) {
                            if (this.get(rows[i].cells[th.cellIndex]).selected) {
                                counter++;
                            }
                        }
                        th.selected = counter === rows.length;

                        // check row cells and update TD selected attribute
                    } else if (td && td.dataset.selectable === "row") {
                        for (let i = 1; i < columns.length; i++) { // skip first column
                            if (this.get(td.parentNode.cells[i]).selected) {
                                counter++;
                            }
                        }
                        td.selected = counter === columns.length - 1;
                    } else if (th && th.dataset.selectable === "all") {
                        const equal = this.getItems().length === this.getSelectedItems().length;
                        th.selected = equal;
                        table.querySelectorAll("[data-selectable='row']").forEach(el => el.selected = equal);
                        table.querySelectorAll("[data-selectable='column']").forEach(el => el.selected = equal);
                    }
                };

                // click
                table.addEventListener("click", e => {
                    const node = e.target;

                    if (node.nodeName === "TH" || node.nodeName === "TD") {
                        e.preventDefault();

                        let cells;

                        if (table) {
                            const data = node.dataset;
                            if ("selectable" in data) {
                                // select / deselect all
                                if (node.dataset.selectable === "all") {
                                    cells = this.getItems();
                                } else {
                                    // select / deselect row
                                    if (node.nodeName === "TD" && data.selectable === "row") {
                                        const row = node.closest("tr");
                                        if (row) {
                                            cells = Array.from(row.cells);
                                        }

                                        // select / deselect column
                                    } else if (node.nodeName === "TH" && data.selectable === "column") {
                                        cells = Array.from(table.tBodies[0].rows).map(row => {
                                            return row.cells[node.cellIndex];
                                        });
                                    }
                                }

                                if (node.selected) {
                                    this.deselect(cells);
                                    node.selected = false;
                                } else {
                                    this.select(cells);
                                    node.selected = true;
                                }

                                update(e);
                            }
                        }
                    }
                });

                // update the 'selected' attribute on the th / td cells
                this.on("selectable.end", update);
            }
        };
    }


    if (window.Selectable && typeof window.Selectable === "function") {
    initSelectableTable(window.Selectable);
    } else {
    (function(root, factory) {
        var plugin = "initSelectableTable";

        if (typeof exports === "object") {
            module.exports = factory(plugin);
        } else if (typeof define === "function" && define.amd) {
            define([], factory);
        } else {
            root[plugin] = factory(plugin);
        }
    })(typeof global !== 'undefined' ? global : this.window || this.global, function() {
        return initSelectableTable;
    });
    }
})();