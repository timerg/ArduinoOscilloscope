#include "Osci.h"


volatile int16_t arrayCount;
volatile int32_t waitCount;
//--------- State
volatile int8_t waitState;
//--------- Value
volatile uint8_t adcReadVal;
volatile  uint8_t adcArray[ADCARRAYSIZE];

void setup(){
  Serial.begin(9600);
  SREG = 0x80;
//  pinMode(22, OUTPUT);


  arrayCount = 0;
  waitState = -1;
  waitCount = 0;
  memset((void*) adcArray, 0, sizeof(adcArray));


  adcSetup();
  comparatorSetup();
  //pwmSetup();
}


void loop(){

  if(waitCount >= WAITCYCLES){
    freeze();
  }
}



