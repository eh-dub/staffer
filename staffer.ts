import {COF, Accidentals} from 'music';

export var Staffer = {
    notes: null,
    key: null,
    lines: [],
    lineHeight: 0,
    noteCount: 0,
    canvas: null,

    init(canvas, notes, key) {
        this.canvas = canvas;
        this.notes = notes || null;
        this.key = key || COF.C;
        this.canvas.setDimensions({ width: 900, height: 400 });

        this.lineHeight = this.canvas.getHeight() / 20;
        for (var i = 0; i < 5; i++) {
            var height = ((i + 4) * this.lineHeight);
            this.lines[i] = new fabric.Line([0, height, this.canvas.getWidth(), height], {
                stroke: 'black',
                selectable: false
            });
        }
    },

    setKey(key: string) {
        this.key = COF[key];
        this.canvas.clear();
        this.init(this.canvas, null, this.key);
        this.draw();
    },

    draw() {

        this.canvas.add(new fabric.Rect({
            width: this.canvas.getWidth(),
            height: this.canvas.getHeight(),
            fill: 'rgba(230,230,230,0.25)',
            selectable: false
        }));

        for (var i = 0; i < this.lines.length; i++) {
            this.canvas.add(this.lines[i]);
        }


        var offsets = {
            F: 7,
            G: 6,
            A: 12,
            B: 11,
            C: 10,
            D: 9,
            E: 8,
            OCTAVE: 7
        }
        if (this.key !== null) {
            console.log('key not null');
            var sharp = '\u266F',
                flat = '\u266D',
                draw;

            for (var i = 0; i < COF[this.key.order].length; i++) {
                console.log('printing note: ' + COF[this.key.order][i]);
                var note = COF[this.key.order][i];
                switch (this.key[note]) {
                    case Accidentals.NATURAL:
                        draw = '';
                        break;
                    case Accidentals.SHARP:
                        draw = sharp;
                        break;
                    case Accidentals.FLAT:
                        draw = flat;
                        break;
                }
                let noteWidth = 30;
                let gutter = 20;
                this.canvas.add(new fabric.Text(draw, {
                    left: noteWidth * i + gutter, top: (this.lineHeight / 2) * (offsets[note]) - 13,
                    width: noteWidth, height: 30,
                }));
            }
        }

        // if (this.notes !== null) {

        //     for(var i = 0; i < this.notes.length; i++) {
        //         let noteWidth = this.canvas.getWidth()/this.notes.length/2;
        //         let gutter = 20;
        //         let note = this.notes[i];
        //         let noteHeight = note.position;
        //         this.canvas.add(new fabric.Ellipse({rx: noteWidth/2, ry: this.lineHeight/2,
        //                                                                                 left: noteWidth*i+gutter, top: 100,
        //                                                                                 fill: 'black'}));
        //     }
        // }
    }

};