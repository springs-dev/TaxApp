import 'source-map-support/register';
import { loadApp } from '../node_data_library/utils/dependencyLoader'
import { basename } from 'path'

const App = loadApp()

new App().run(basename(__dirname), 'importer')
