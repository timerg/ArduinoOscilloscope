#include "Isr.h"
#include "Osci.h"

ISR(ADC_vect)
{
  if(timerState == ON){
    timerCount++;
  }
  
  if(writeToArray == ON){
    adcArray[arrayCount] = ADCH;
    arrayCount = (arrayCount + 1) % ADCARRAYSIZE;
  }

  if(waitState == ON){
    waitCount++;
    if(waitCount == WAITCYCLES){
      waitState = OFF;
      writeToArray = OFF;

      // start timer
      timerState = ON;
      timerCount = 0;
    } 
  }
}

ISR(ANALOG_COMP_vect){
  cbi(ACSR, ACIE );
  waitState = ON;
  timerState = OFF;
  header_time = timerCount;
}
