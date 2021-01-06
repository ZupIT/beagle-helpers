//
//  AppDelegate.swift
//  sampleScaffold
//
//  Created by João Jacó S. Abreu on 28/12/20.
//

import UIKit
import BeagleScaffold
import Beagle

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
        BeagleConfig.start()
        
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = BeagleScaffoldDemoViewController
        window?.makeKeyAndVisible()
        
        return true
    }


}

