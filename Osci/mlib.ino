#include "mlib.h"


void freeze(void){
  //cbi(ADCSRA, ADEN);    // Stop ADC
  waitCount = 0;
  sendArray();
  restart();
}

void restart(void){
  arrayCount = 0;
  memset((void*) adcArray, 0, sizeof(adcArray));
  //sbi(ADCSRA, ADEN);
  sbi(ACSR, ACIE );
  writeToArray = ON;
  //bitWrite(ADCSRA, 6, 1);
}

void sendArray(){
  Serial.print("data");
  Serial.println(header_time);
  byte buf[4];
  buf[0] = header_time & 255;
  buf[1] = (header_time >> 8)  & 255;
  buf[2] = (header_time >> 16) & 255;
  buf[3] = (header_time >> 24) & 255;
  Serial.write(buf, sizeof(buf));
  Serial.write((uint8_t*) adcArray, arrayCount); // before comparator itr
  Serial.write((uint8_t*) adcArray + arrayCount, ADCARRAYSIZE - arrayCount);    //after comparator itr
  Serial.println(" ");
}


