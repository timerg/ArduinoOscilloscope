#include <Arduino.h>

#ifndef _OSCI_
#define _OSCI_

  #include "Setup.h"
  #include "Isr.h"
  #include "mlib.h"

	#ifndef cbi
	#define cbi(sfr, bit) (_SFR_BYTE(sfr) &= ~_BV(bit))
	#endif

	#ifndef sbi
	#define sbi(sfr, bit) (_SFR_BYTE(sfr) |= _BV(bit))
	#endif

//-------- User parameter
  #define _DEBUG_
	#define ADCARRAYSIZE 1280
	#define WAITCYCLES 640
 #define BUFFLIMIT 10   //25k
 #define ON 1
 #define OFF -1

//-------- Variable
  //--------- Counter
	extern volatile int16_t arrayCount;
  extern volatile int32_t waitCount;
  extern volatile unsigned long timerCount;
  //--------- State
  extern volatile int8_t waitState;    // OFF: non-waiting, 1: wait cycle
  extern volatile int8_t timerState;   // ISR(ANALOG_COMP_vect): 1 -> OFF,  (waitCount == WAITCYCLES): 0 -> OFF
  extern volatile int8_t writeToArray;
  //--------- Value
	extern volatile uint8_t adcReadVal;
	extern volatile uint8_t adcArray[ADCARRAYSIZE];
  extern volatile unsigned long header_time;


#endif
