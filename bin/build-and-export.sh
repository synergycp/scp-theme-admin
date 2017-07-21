#!/bin/bash

gulp prod build
OD=$(pwd)
tar -zcvf "/scp/install.synergycp.com/bm/theme/default/admin.tar.gz" --transform 's,^public,admin,' public
cd $OD
