package br.com.zup.grpc

import br.com.zup.beagle.widget.layout.Container
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.beagle.widget.ui.Text
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class BeagleGrpcUtilTest {

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

    @Test
    fun `Assert that asGrpcView() returns a ViewNode gRPC DTO message based on Beagle JSON`() {
        val screen = asGrpcView(textScreen.build())

        assertNotNull(screen.id)
        assertEquals("beagle:screenComponent", screen.beagleComponent)
        assertEquals("beagle:text", screen.child.getChildren(0).beagleComponent)
        assertEquals("{\"text\":\"Hello. This is a text!\"}", screen.child.getChildren(0).attributes)
        assertEquals("beagle:container", screen.child.beagleComponent)
        assertNotNull(screen.child.id)
        assertNotNull(screen.child.style)
        assertNotNull(screen.child.attributes)
        assertNotNull(screen.child.getChildren(0).id)
        assertNotNull(screen.child.getChildren(0).style)
        assertNotNull(screen.style)
        assertNotNull(screen.attributes)

    }
}