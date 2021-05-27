package br.com.zup.grpc

import beagle.Messages
import br.com.zup.beagle.serialization.jackson.BeagleSerializationUtil
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.grpc.exception.BeagleException
import com.fasterxml.jackson.annotation.JsonInclude

private fun asJsonString(value: Any): String {
    return BeagleSerializationUtil.beagleObjectMapper().writeValueAsString(value)
}

private fun buildDataContext(context: Map<String, Any>): Messages.DataContext {
    val messageBuilder = Messages.DataContext.newBuilder().setId(context["id"].toString())
    if (context["value"] != null) {
        messageBuilder.value = asJsonString(context["value"]!!)
    }
    return messageBuilder.build()
}

private val skip = setOf("_beagleComponent_", "context", "id", "style", "children", "child")

private fun serializeNodeAttributes(jsonMap: Map<String, Any>): Map<String, Any> = jsonMap.filterKeys {
    !skip.contains(it)
}

private fun buildNode(jsonMap: Map<String, Any>): Messages.ViewNode {
    val messageBuilder = Messages
        .ViewNode
        .newBuilder()
        .setBeagleComponent(jsonMap["_beagleComponent_"].toString())

    if (jsonMap["id"] != null) messageBuilder.id = jsonMap["id"].toString()
    if (jsonMap["context"] != null) messageBuilder.context = buildDataContext(jsonMap["context"] as Map<String, Any>)
    if (jsonMap["style"] != null) messageBuilder.style = asJsonString(jsonMap["style"]!!)
    if (jsonMap["child"] != null) messageBuilder.child = buildNode(jsonMap["child"] as Map<String, Any>)

    val attributes = serializeNodeAttributes(jsonMap)
    if (attributes.isNotEmpty()) messageBuilder.attributes = asJsonString(attributes)

    val children = jsonMap["children"] as List<Map<String, Any>>?
    if (children?.isEmpty() == false) {
        children.forEach {
            messageBuilder.addChildren(buildNode(it))
        }
    }

    return messageBuilder.build()
}

fun asGrpcView(screen: Screen): Messages.ViewNode {
    val mapper = BeagleSerializationUtil.beagleObjectMapper()
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    val jsonMap = mapper.convertValue(screen, Map::class.java) as Map<String, Any>
    try {
        return buildNode(jsonMap)
    } catch (err: Exception) {
        err.printStackTrace()
        throw BeagleException("Fail on build a beagle gRPC screen")
    }
}
