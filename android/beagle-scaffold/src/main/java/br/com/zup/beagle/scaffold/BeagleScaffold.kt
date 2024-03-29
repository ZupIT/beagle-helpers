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

package br.com.zup.beagle.scaffold

import br.com.zup.beagle.android.action.Action
import br.com.zup.beagle.android.analytics.AnalyticsProvider
import br.com.zup.beagle.android.data.serializer.adapter.generic.TypeAdapterResolver
import br.com.zup.beagle.android.imagedownloader.BeagleImageDownloader
import br.com.zup.beagle.android.logger.BeagleLogger
import br.com.zup.beagle.android.navigation.BeagleControllerReference
import br.com.zup.beagle.android.navigation.DeepLinkHandler
import br.com.zup.beagle.android.networking.HttpClient
import br.com.zup.beagle.android.networking.HttpClientFactory
import br.com.zup.beagle.android.networking.ViewClient
import br.com.zup.beagle.android.networking.urlbuilder.UrlBuilder
import br.com.zup.beagle.android.operation.Operation
import br.com.zup.beagle.android.setup.BeagleConfig
import br.com.zup.beagle.android.setup.BeagleSdk
import br.com.zup.beagle.android.setup.DesignSystem
import br.com.zup.beagle.android.widget.WidgetView
import br.com.zup.beagle.defaults.httpclient.HttpClientDefault
import br.com.zup.beagle.defaults.logger.BeagleLoggerDefault

class BeagleScaffold(private val beagleSdk: BeagleSdk) : BeagleSdk {

    override val config: BeagleConfig = beagleSdk.config
    override val deepLinkHandler: DeepLinkHandler? = beagleSdk.deepLinkHandler
    override val httpClientFactory: HttpClientFactory = beagleSdk.httpClientFactory ?: object :
        HttpClientFactory {
        override fun create(): HttpClient = HttpClientDefault()
    }
    override val designSystem: DesignSystem? = beagleSdk.designSystem
    override val imageDownloader: BeagleImageDownloader? = beagleSdk.imageDownloader
    override val viewClient: ViewClient? = beagleSdk.viewClient
    override val controllerReference: BeagleControllerReference? = beagleSdk.controllerReference
    override val typeAdapterResolver: TypeAdapterResolver? = beagleSdk.typeAdapterResolver
    override val analyticsProvider: AnalyticsProvider? = beagleSdk.analyticsProvider
    override val urlBuilder: UrlBuilder? = beagleSdk.urlBuilder
    override val logger: BeagleLogger = beagleSdk.logger ?: BeagleLoggerDefault()

    override fun registeredActions(): List<Class<Action>> = beagleSdk.registeredActions()

    override fun registeredOperations(): Map<String, Operation> = beagleSdk.registeredOperations()

    override fun registeredWidgets(): List<Class<WidgetView>> = beagleSdk.registeredWidgets()
}