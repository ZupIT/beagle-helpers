#
# Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

Pod::Spec.new do |s|

  s.name = 'BeagleGRPC'
  s.module_name = 'BeagleGRPC'
  s.version = '0.1.0'
  s.license = { :type => 'Apache 2.0', :file => 'LICENSE' }
  s.summary = 'Beagle NetworkClient implementation using gRPC'
  s.description = 'This framework provides a client to communicate with Beagle using gRPC.'
  s.homepage = 'https://docs.usebeagle.io'
  s.authors  = { 'Zup IT' => 'beagle@zup.com.br' }

  s.swift_version = '5.2'
  s.ios.deployment_target = '10.0'
  s.source = { :git => "https://github.com/ZupIT/beagle-helpers.git", :tag => s.version }

  s.source_files = 'iOS/beagle-grpc/Sources/*.swift'

  s.subspec 'Proto' do |ss|
    ss.source_files = 'iOS/beagle-grpc/Sources/Proto/*.swift'
  end

  s.dependency 'Beagle', '> 1.6.2'
  s.dependency 'gRPC-Swift', '>= 1.0.0'

end
