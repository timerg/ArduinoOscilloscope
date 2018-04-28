#include "mlib.h"



void freeze(void){
  cbi(ADCSRA, ADEN);    // Stop ADC
  waitCount = 0;
  waitState = -1;
  sendArray();
  restart();
}

void restart(void){
  arrayCount = 0;
  memset((void*) adcArray, 0, sizeof(adcArray));
  sbi(ADCSRA, ADEN);
  sbi(ACSR, ACIE );
  bitWrite(ADCSRA, 6, 1);
}

void sendArray(){
  Serial.write((uint8_t*) adcArray, arrayCount); // before comparator itr
  Serial.write((uint8_t*) adcArray + arrayCount, ADCARRAYSIZE - arrayCount);    //after comparator itr
}


