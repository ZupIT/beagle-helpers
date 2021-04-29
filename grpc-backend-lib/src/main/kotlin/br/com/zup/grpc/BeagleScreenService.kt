package br.com.zup.grpc
import beagle.Messages
import beagle.ScreenServiceGrpc
import br.com.zup.beagle.widget.layout.ScreenBuilder
import io.grpc.stub.StreamObserver

abstract class BeagleScreenService : ScreenServiceGrpc.ScreenServiceImplBase() {

    abstract fun screens(): Map<String, ScreenBuilder>

    override fun getScreen(request: Messages.ScreenRequest, responseObserver: StreamObserver<Messages.ViewNode>? ) {
        val view = getScreenByName(request.name)

        responseObserver?.onNext(asGrpcView(view))
        responseObserver?.onCompleted()
    }

    fun getScreenByName(name: String) =
        screens()[name]?.build() ?: throw Error("Screen with name $name doesn't exist.")
}
