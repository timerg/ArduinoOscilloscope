'use strict'
const Buffer = require('safe-buffer').Buffer
const Transform = require('stream').Transform

class HeaderParser extends Transform {
  constructor (options) {
    options = options || {}
    super(options)
    if (options.delimiter === undefined) {
      throw new TypeError('"delimiter" is not a bufferable object')
    }
    if (options.delimiter.length === 0) {
      throw new TypeError('"delimiter" has a 0 or undefined length')
    }
    this.header = Buffer.from(options.header);
    this.readOffset = 0;    // position of delimiter candidate string
    this.bodyOffset = 0;
    this.bodyLength = options.bodyLength;
  }
  _transform (chunk, encoding, cb) {
    const header = this.header;
    let chunkOffset = 0;
    if(bodyOffset === 0){
      while (this.readOffset < header.length && chunkOffset < chunk.length) {
        if (header[this.readOffset] === chunk[chunkOffset]) {
          this.readOffset++
          if(this.readOffset === header.length){
            if(chunk.length - chunkOffset < this.bodyLength){
              this.push(chunk.slice(chunkOffset));
            } else {
              this.push(chunk.slice(chunkOffset, chunkOffset + this.bodyLength));
              data = chunk.slice(chunkOffset + this.bodyLength);
            }

          }
        } else {
          this.readOffset = 0
        }
        chunkOffset++
      }
    }
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
    this.push(this.buffer.slice(0, this.position))
    this.buffer = Buffer.alloc(this.length)
    // cb()
  }
}
module.exports = MyDelimiter