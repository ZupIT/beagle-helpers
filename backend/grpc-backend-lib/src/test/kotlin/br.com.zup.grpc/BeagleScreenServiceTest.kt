package br.com.zup.grpc

import beagle.Messages
import br.com.zup.beagle.widget.context.Bind
import br.com.zup.beagle.widget.layout.Container
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.beagle.widget.ui.Text
import br.com.zup.grpc.exception.BeagleException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

internal class BeagleScreenServiceTest {
    companion object {
        const val MSG = "Hello. This is a text!"
    }

    private val textScreen = object : ScreenBuilder {
        override fun build() = Screen(
            child = Container(
                children = listOf(
                    Text(MSG)
                )
            )
        )
    }

    private val beagleScreenService = object : BeagleScreenService() {
        override fun screens(): Map<String, (String) -> ScreenBuilder> = mapOf("text" to { textScreen })
    }

    @Test
    fun `Assert that getScreenByName does not returns a non existent screen`() {
        val screenName = "button"
        val exception = assertThrows<BeagleException> {
            beagleScreenService.getScreenByName(Messages.ScreenRequest.newBuilder().setName(screenName).build())
        }
        assertEquals("Screen with name $screenName doesn't exist.", exception.message)
    }

    @Test
    fun `Assert that method getScreenByName() returns a Beagle Screen`() {

        val screen = beagleScreenService.getScreenByName(Messages.ScreenRequest.newBuilder().setName("text").build())
        val result = (((screen.child as Container).children!![0] as Text).text as Bind.Value).value
        assertEquals(MSG, result)
    }
}
