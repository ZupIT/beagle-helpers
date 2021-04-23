import beagle.Messages
import beagle.ScreenServiceGrpcKt
import br.com.zup.beagle.serialization.jackson.BeagleSerializationUtil
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.ScreenBuilder

open class BeagleScreenService(
    private val screens: Map<String, ScreenBuilder>
) : ScreenServiceGrpcKt.ScreenServiceCoroutineImplBase() {

    override suspend fun getScreen(request: Messages.ScreenRequest): Messages.ViewNode {
        val mapper = BeagleSerializationUtil.beagleObjectMapper()
        val parameters: Map<String, Any> = try {
            mapper.readValue(request.parameters, MutableMap::class.java) as MutableMap<String, Any>
        } catch (err: Exception) {
            mapOf()
        }
        // todo: get the real headers
        val headers = HashMap<String, String>()
        val view = getScreenByName(request.name, parameters, headers)
        return asGrpcView(view)
    }

    private fun getScreenByName(name: String, parameters: Map<String, Any>, headers: Map<String, String>): Screen {
        val builder = this.screens[name] ?: throw Error("Screen with name $name doesn't exist.")
        return builder.build()
    }
}
