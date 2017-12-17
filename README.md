# KOMA UI
## Static Web Single Page App
### With a SparQL Endpoint


###api REST
hpi 6.3 

##todo: 
2:
sparql endpoint with REST api via APIGATEWAY

## sparQL over http
SPARQL Query

ARQ's QueryExecutionFactory.sparqlService can be used.

SPARQL Update

See UpdateExecutionFactory.createRemote

SPARQL HTTP

See DatasetAccessor
queries: 
all competencies of Alice
competencies of Alice in Fach


= query lang, protokol layer, output spec.
service : federated graphs link to this.endpoint

http query :: parts:
URI of sparql endpoint
named-graph-uri=http://...rdf
query=SELECT+%...WHERE...GRAPH

key word:

ASK -> at least one res, true/false, xml/json
DEFINE
CONSTRUCT
FILTER
... 

GRAPH? 
select distinct ?g 
where { 
GRAPH ?g { ?s ?p ?o . }
}
