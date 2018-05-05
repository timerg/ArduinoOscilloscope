/* When meet a 'header', push a fixed size data chunk then discard other data if no more header is meet.
*/

'use strict'
const Buffer = require('safe-buffer').Buffer
const Transform = require('stream').Transform

class HeaderParser extends Transform {
  constructor (options) {
    options = options || {};
    super(options);
    if (options.header === undefined) {
      throw new TypeError('"header" is not a bufferable object')
    }
    if (options.header.length === 0) {
      throw new TypeError('"header" has a 0 or undefined length')
    }
    this.header = Buffer.from(options.header);
    this.readOffset = 0;    // position of header candidate string
    this.bodyOffset = 0;
    this.bodyLength = options.bodyLength;
  }
  _transform (chunk, encoding, cb) {
    const header = this.header;
    let chunkOffset = 0;
    if(this.bodyOffset !== 0){
      if(chunk.length < this.bodyLength - this.bodyOffset){
        this.push(chunk);
        this.bodyOffset = this.bodyOffset + chunk.length;
        return cb();
      } else {
        let lengthToPush = this.bodyLength - this.bodyOffset;
        this.push(chunk.slice(0, lengthToPush));
        chunkOffset = lengthToPush;
        this.bodyOffset = 0;
      }
    }
    while (this.readOffset < header.length && chunkOffset < chunk.length) {
      if (header[this.readOffset] === chunk[chunkOffset]) {
        this.readOffset++;
        chunkOffset++;
        if(this.readOffset === header.length){
          this.readOffset = 0;
          let remainLength = chunk.length - chunkOffset;
          if( remainLength <= this.bodyLength){
            this.push(chunk.slice(chunkOffset));
            this.bodyOffset = remainLength;
            break;
          } else {
            this.push(chunk.slice(chunkOffset, chunkOffset + this.bodyLength));
            this.bodyOffset = 0;
            chunkOffset = chunkOffset + chunkOffset + this.bodyLength;
          }

        }
      } else {
        this.readOffset = 0;
        chunkOffset++;
      }
    }
    cb();
    // let chunkOffset = 0;
    // if(this.position !== 0){
    //   while (cursor < chunk.length) {
    //     this.buffer[this.position] = chunk[chunkOffset];
    //     this.position++;
    //     if (this.position === this.length) {
    //       this.push(this.buffer);
    //       this.buffer = Buffer.alloc(this.length);
    //       this.position = 0;
    //       this.readOffset = 0;
    //       break;
    //     }
    //     chunkOffset++;
    //   }
    // }
    //
    // while(chunkOffset < chunk.length){
    //   if (delimiter[this.readOffset] === chunk[chunkOffset]) {
    //     this.readOffset++;
    //     chunkOffset++;
    //     if (this.readOffset === delimiter.length){
    //       while (cursor < chunk.length) {
    //         this.buffer[this.position] = chunk[chunkOffset];
    //         this.position++;
    //         if (this.position === this.length) {
    //           this.push(this.buffer);
    //           this.buffer = Buffer.alloc(this.length);
    //           this.position = 0;
    //           this.readOffset = 0;
    //           break;
    //         }
    //       }
    //     }
    //   } else {
    //     this.readOffset = 0
    //   }
    //   chunkOffset++;
    // }
    // cb();

  }
  _flush (cb) {
    this.push(this.buffer.slice(0, this.position));
    this.buffer = Buffer.alloc(this.length);
    // cb()
  }
}
module.exports = HeaderParser