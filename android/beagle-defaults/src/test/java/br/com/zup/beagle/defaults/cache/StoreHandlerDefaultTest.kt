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

package br.com.zup.beagle.defaults.cache

import android.app.Application
import android.util.Log
import androidx.test.core.app.ApplicationProvider
import androidx.test.runner.AndroidJUnit4
import br.com.zup.beagle.android.store.StoreType
import br.com.zup.beagle.test.rules.BeagleComponentsRule
import io.mockk.*
import io.mockk.impl.annotations.MockK
import junit.framework.Assert.assertEquals
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class StoreHandlerDefaultTest {

    @get:Rule
    val begleComponentsRule = BeagleComponentsRule()
    val application = ApplicationProvider.getApplicationContext() as Application

    @MockK
    private lateinit var databaseLocalStore: DatabaseLocalStore
    private lateinit var storeHandlerDefault: StoreHandlerDefault

    @Before
    fun setUp() {
        MockKAnnotations.init(this)
        mockkStatic(Log::class)
        every { Log.e(any(), any()) } returns 0
        storeHandlerDefault = StoreHandlerDefault.newInstance(application)
        storeHandlerDefault.databaseLocalStore = databaseLocalStore
        mockkObject(MemoryLocalStore)
    }

    @After
    fun tearDown() {
        unmockkAll()
    }

    @Test
    fun save_should_call_database_store_when_type_is_DATABASE() {
        // Given
        val dataKey = "key"
        val dataValue = "value"
        val data = mapOf(dataKey to dataValue)
        data.forEach {
            every { databaseLocalStore.save(it.key, it.value) } just Runs
        }

        // When
        storeHandlerDefault.save(StoreType.DATABASE, data)

        // Then
        data.forEach {
            verify(exactly = 1) { databaseLocalStore.save(it.key, it.value) }
        }
    }

    @Test
    fun save_should_call_memory_store_when_type_is_MEMORY() {
        // Given
        val dataKey = "key"
        val dataValue = "value"
        val data = mapOf(dataKey to dataValue)

        data.forEach {
            every { MemoryLocalStore.save(it.key, it.value) } just Runs
        }

        // When
        storeHandlerDefault.save(StoreType.MEMORY, data)

        // Then
        data.forEach {

            verify(exactly = 1) { MemoryLocalStore.save(it.key, it.value) }
        }
    }

    @Test
    fun restore_should_call_database_store_when_type_is_DATABASE() {
        // Given
        val dataKey = "key"
        val dataValue = "value"
        every { databaseLocalStore.restore(dataKey) } returns dataValue

        // When
        val value = storeHandlerDefault.restore(StoreType.DATABASE, dataKey)

        // Then
        assertEquals(dataKey, value.keys.first())
        assertEquals(dataValue, value.values.first())
    }

    @Test
    fun restore_should_call_memory_store_when_type_is_MEMORY() {
        // Given
        val dataKey = "key"
        val dataValue = "value"
        every { MemoryLocalStore.restore(dataKey) } returns dataValue

        // When
        val value = storeHandlerDefault.restore(StoreType.MEMORY, dataKey)

        // Then
        assertEquals(dataKey, value.keys.first())
        assertEquals(dataValue, value.values.first())
    }
}