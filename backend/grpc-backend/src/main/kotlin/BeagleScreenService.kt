
import beagle.Messages
import beagle.ScreenServiceGrpc
import br.com.zup.beagle.serialization.jackson.BeagleSerializationUtil
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.ScreenBuilder
import io.grpc.stub.StreamObserver

open class BeagleScreenService(private val screens: Map<String, ScreenBuilder>) : ScreenServiceGrpc.ScreenServiceImplBase() {

    override fun getScreen(request: Messages.ScreenRequest, responseObserver: StreamObserver<Messages.ViewNode>? ) {
        val mapper = BeagleSerializationUtil.beagleObjectMapper()
        val parameters: Map<String, Any> = try {
            mapper.readValue(request.parameters, MutableMap::class.java) as MutableMap<String, Any>
        } catch (err: Exception) {
            mapOf()
        }

        val headers = BeagleHeadersInterceptor.HEADERS_VALUE.get()
        val view = getScreenByName(request.name, parameters, headers)
        responseObserver?.onNext(asGrpcView(view))
        responseObserver?.onCompleted()
    }

    private fun getScreenByName(name: String, parameters: Map<String, Any>, headers: Map<String, String>): Screen {
        val builder = this.screens[name] ?: throw Error("Screen with name $name doesn't exist.")
        return builder.build()
    }
}
