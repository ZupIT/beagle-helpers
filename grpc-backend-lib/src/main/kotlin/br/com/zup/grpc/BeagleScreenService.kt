package br.com.zup.grpc

import beagle.Messages
import beagle.ScreenServiceGrpc
import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.grpc.exception.BeagleException
import io.grpc.Status
import io.grpc.stub.StreamObserver

abstract class BeagleScreenService : ScreenServiceGrpc.ScreenServiceImplBase() {

    abstract fun screens(): Map<String, (String) -> ScreenBuilder>

    override fun getScreen(request: Messages.ScreenRequest, responseObserver: StreamObserver<Messages.ViewNode>?) {
        try {
            responseObserver?.onNext(asGrpcView(getScreenByName(request)))
            responseObserver?.onCompleted()
        }
        catch (err: Exception) {
            responseObserver?.onError(Status.INVALID_ARGUMENT.withDescription(err.message ?: "Unknown screen name")
                .asRuntimeException())
        }
    }

    fun getScreenByName(request: Messages.ScreenRequest) =
        screens()[request.name]?.invoke(request.parameters)?.build()
            ?: throw BeagleException("Screen with name ${request.name} doesn't exist.")
}
