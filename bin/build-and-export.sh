#!/bin/bash

VERSION=$1

gulp prod build
tar -zcvf "/scp/install.synergycp.com/bm/${VERSION}/theme/default/admin.tar.gz" --transform 's,^public,admin,' public
