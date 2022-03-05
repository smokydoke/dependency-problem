import { RequestHandler } from 'express';
import Axios from 'axios'
import { NPMPackage } from './types';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
export const getDependency: RequestHandler = async function (req, res, next) {
  const { name, version } = req.params;

  try {
    const npmPackage: NPMPackage = (await Axios.get(`https://registry.npmjs.org/${name}/${version}`)).data;
  
    if (!npmPackage) {
      return res.status(200).json(`Package ${name}@${version} not found in registry`);
    }

    return res.status(200).json(npmPackage);
  } catch (error) {
    return next(error);
  }
};
