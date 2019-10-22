#!/bin/bash
sqlite3 cloud.db < queries/init/init.sql
foreman start
