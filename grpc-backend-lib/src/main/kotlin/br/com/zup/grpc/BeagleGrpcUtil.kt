package br.com.zup.grpc

import beagle.Messages
import br.com.zup.beagle.serialization.jackson.BeagleSerializationUtil
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.grpc.exception.BeagleException
import com.fasterxml.jackson.annotation.JsonInclude

private fun asJsonString(value: Any): String {
    return BeagleSerializationUtil.beagleObjectMapper().writeValueAsString(value)
}

private fun buildDataContext(context: Map<String, Screen>): Messages.DataContext {
    val messageBuilder = Messages.DataContext.newBuilder().setId(context["id"].toString())
    if (context["value"] != null) {
        messageBuilder.value = asJsonString(context["value"]!!)
    }
    return messageBuilder.build()
}

private fun serializeNodeAttributes(jsonMap: MutableMap<String, Screen>): Map<String, Screen> {
    val skip = listOf("_beagleComponent_", "context", "id", "style", "children", "child")
    val attributes = HashMap<String, Screen>()
    jsonMap.forEach {
        if (!skip.contains(it.key)) attributes[it.key] = it.value
    }
    return attributes
}

private fun buildNode(jsonMap: MutableMap<String, Screen>): Messages.ViewNode {
    val messageBuilder = Messages
        .ViewNode
        .newBuilder()
        .setBeagleComponent(jsonMap["_beagleComponent_"].toString())

    if (jsonMap["id"] != null) messageBuilder.id = jsonMap["id"].toString()
    if (jsonMap["context"] != null) messageBuilder.context = buildDataContext(jsonMap["context"] as Map<String, Screen>)
    if (jsonMap["style"] != null) messageBuilder.style = asJsonString(jsonMap["style"]!!)
    if (jsonMap["child"] != null) messageBuilder.child = buildNode(jsonMap["child"] as MutableMap<String, Screen>)

    val attributes = serializeNodeAttributes(jsonMap)
    if (attributes.isNotEmpty()) messageBuilder.attributes = asJsonString(attributes)

    val children = jsonMap["children"] as List<MutableMap<String, Screen>>?
    if (children?.isEmpty() == false) {
        children.forEach {
            messageBuilder.addChildren(buildNode(it))
        }
    }

    return messageBuilder.build()
}

fun asGrpcView(widget: Screen): Messages.ViewNode {
    val mapper = BeagleSerializationUtil.beagleObjectMapper()
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    val jsonMap = mapper.convertValue(widget, MutableMap::class.java) as MutableMap<String, Screen>
    try {
        return buildNode(jsonMap)
    } catch (err: Exception) {
        err.printStackTrace()
        throw BeagleException("Fail on build a beagle gRPC screen")
    }
}
