// const imports = {};

// fetch('./main.wasm')
//     .then(response => response.arrayBuffer())
//     .then(bytes => WebAssembly.compile(bytes))
//     .then(module => new WebAssembly.Instance(module, imports))
//     .then(instance => {
//         const result = instance.exports.run();
//         console.log('The result is', result);
//     });

// Allocate some memory for the moodule. Initial size is specified in pages of 16 kiB.
const memory = new WebAssembly.Memory( { initial: 17 } );

// Everything we want to pass to our module during initialisation. The names of the keys
// are not important, so long as our WASM module knows to look for them.
const imports = {
    js: {
        mem: memory
    }
};

fetch('./main.wasm')
    .then( response => response.arrayBuffer() )
    .then( bytes => WebAssembly.compile( bytes ) )
    .then( module => new WebAssembly.Instance( module, imports ) )
    .then( instance => {

        // Set the pixel data in the module's memory
        const res = instance.exports.run();
        console.log({res});

        // Put the module's memory into an array suitable for use in ImageData.
        // Allocate width x height x number of colour planes (RGBA = 4)
        const byteArray = new Uint8ClampedArray( memory.buffer, 0, 512 * 512 * 4 );

        // Create an ImageData instance from the array
        const img = new ImageData( byteArray, 512, 512 );

        // Get the canvas element from the DOM
        const canvas = document.getElementById('c');

        // Get a 2D graphics context for the canvas
        const ctx = canvas.getContext('2d');

        // Put the image data into the canvas
        ctx.putImageData( img, 0, 0 );

    });