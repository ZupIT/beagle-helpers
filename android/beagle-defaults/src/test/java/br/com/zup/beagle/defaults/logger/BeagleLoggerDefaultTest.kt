/*
 *  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

package br.com.zup.beagle.defaults.logger

import android.util.Log
import io.mockk.*
import org.junit.jupiter.api.*

@DisplayName("Given an BeagleLoggerClass")
internal class BeagleLoggerDefaultTest{

    val beagleLoggerDefault = BeagleLoggerDefault()
    private val BEAGLE_TAG = "BeagleSDK"

    @BeforeEach
    fun setUp(){
        mockkStatic(Log::class)
    }

    @AfterEach
    fun tearDown(){
        //unmockkStatic(Log::class)
        unmockkAll()
    }

    @DisplayName("WhenWarningIsCalled")
    @Nested
    inner class ToWarning{
        @DisplayName("ThenTheWarningTagIsCalledWithTheCorrectTagAndMessage")
        @Test
        fun checksTagAndLogMessageToWarning(){
            //Given
            val message = "Warning message"
            every { Log.w(BEAGLE_TAG, message) } returns 0

            //When
            beagleLoggerDefault.warning(message)

            //Then
            verify (exactly = 1){ Log.w(BEAGLE_TAG, message) }
        }
}

    @DisplayName("WhenErrorIsCalled")
    @Nested
    inner class ToError{
        @DisplayName("ThenTheErrorTagIsCalledWithTheCorrectTagAndMessage")
        @Test
        fun checksTagAndLogMessageToError(){
            //Given
            val message = "Error message"
            every { Log.e(BEAGLE_TAG, message) } returns 0

            //When
            beagleLoggerDefault.error(message)

            //Then
            verify (exactly = 1){ Log.e(BEAGLE_TAG, message) }
        }

        @DisplayName("ThenTheErrorTagIsCalledWithThrowable")
        @Test
        fun checksThrowableMessageToError(){
            //Given
            val message = "Error message"
            val throwable:Throwable = Throwable("Error message from Throwable")

            every { Log.e(BEAGLE_TAG, message, throwable) } returns 0

            //When
            beagleLoggerDefault.error(message, throwable)

            //Then
            verify (exactly = 1){ Log.e(BEAGLE_TAG, message, throwable) }
        }

    }

    @DisplayName("WhenInfoIsCalled")
    @Nested
    inner class ToInfo{
        @DisplayName("ThenTheWarningTagIsCalledWithTheCorrectTagAndMessage")
        @Test
        fun checksTagAndLogMessageToInfo(){
            //Given
            val message = "Info message"
            every { Log.i(BEAGLE_TAG, message) } returns 0

            //When
            beagleLoggerDefault.info(message)

            //Then
            verify (exactly = 1){ Log.i(BEAGLE_TAG, message) }
        }

    }
}