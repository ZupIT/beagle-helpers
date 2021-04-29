package br.com.zup.grpc

import br.com.zup.beagle.widget.context.Bind
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.Container
import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.beagle.widget.ui.Text
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.lang.Error

internal class BeagleScreenServiceTest {
    companion object {
        const val MSG = "Hello. This is a text!"
    }

    private val textScreen = object: ScreenBuilder {
        override fun build() = Screen(
            child = Container(
                children = listOf(
                    Text(MSG)
                )
            )
        )
    }

    private val beagleScreenService = object: BeagleScreenService() {
        override fun screens() = mapOf("text" to textScreen)
    }

    @Test
    fun `Assert that getScreenByName does not returns a non existent screen`() {
        val screenName = "button"
        val exception = assertThrows<Error> { beagleScreenService.getScreenByName(screenName) }

        assertEquals("Screen with name $screenName doesn't exist.", exception.message)
    }

    @Test
    fun `Assert that method getScreenByName() returns a Beagle Screen`() {

        val screen = beagleScreenService.getScreenByName("text")
        val result = (((screen.child as Container).children!![0] as Text).text as Bind.Value).value
        assertEquals(MSG, result)
    }
}
