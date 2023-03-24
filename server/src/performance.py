import iperf3
import tcp_latency
from pythonping import ping
import json

__author__ = "Paulo Araújo"
__copyright__ = "Netedge UMinho"
__email__ = "paulo.araujo@algoritmi.uminho.pt"

def tcp_test(host = "127.0.0.1", port = 5201, runs = 10, interval = 10, timeout = 5):
    """Runs a series of tests and returns the min, max and avg measured TCP RTT,
    and bandwidth values, both upstream and downstream. 

    Parameters
    ----------
    host : str (ip)
        The host to connect to, by default is localhost
    port : int
        The port to connect to, by default 5201
    runs : int
        The number of runs, by default 10
    interval: int (seconds)
        The interval between each run, by default 10 seconds
    timeout: int (seconds)
        The timeout for the TCP connection 

    Returns
    -------
    python dict  
        Python dict with information about the performed TCP test, including min, max and avg RTT, 
        and information about the performed iperf3 test, which includes upstream bandwidth and downstream bandwidth.
        Error information in data if any error is caught. 
    """

    print("TCP test: testing host " + host);

    testInfo = {
            "protocol": "tcp",
            "type": "results",
            "data": {}
    }

    try:

        iperf_client = iperf3.Client()
        iperf_client.server_hostname = host
        iperf_client.port = port
        iperf_client.duration = 10
        iperf_client.protocol = 'tcp'
        result = iperf_client.run()

        if result.error:
            raise Exception("Cannot connect to TCP server " + str(host) + " on port " + str(port))

        latency = tcp_latency.measure_latency(host = host, port = port, runs = runs, wait = interval, timeout = timeout)
        latencyMax = max(latency)
        latencyMin = min(latency)
        avgValue = 0 if len(latency) == 0 else sum(latency)/len(latency)

        testInfo["data"] = {
                "rtt": {
                    "min" : latencyMin,
                    "max" : latencyMax,
                    "avg" : avgValue,
                    "unit" : "ms"
                },
                "bandwidth" : {
                    "upStream" : result.sent_Mbps,
                    "downStream" : result.received_Mbps,
                    "unit" : "Mbps"
                }
            }
        
    except Exception as e:
        testInfo["type"] = "error"
        testInfo["data"] = format(e)

    return testInfo

def udp_test(host = "127.0.0.1", port = 5201):
    """Runs a series of tests and returns the measured bandwidth, jitter and percentage of 
    lost packets on a UDP connection.

    Parameters
    ----------
    host : str
        The host to connect to, by default is localhost
    port : int
        The port to connect to, by default 5201
    
    Returns
    -------
    python dict  
        Python dict with information about the performed iperf3 UDP test, including upstream 
        bandwidth, jitter and percentage of lost packets.
        Error information in data if any error is caught. 
    """

    print("UDP test: testing host " + host);

    testInfo = {
            "protocol": "udp",
            "type": "results",
            "data": {}
    }

    try: 
    
        iperf_client = iperf3.Client()
        iperf_client.server_hostname = host
        iperf_client.port = port
        iperf_client.duration = 10
        iperf_client.blksize = 1400
        iperf_client.protocol = 'udp'
        result = iperf_client.run()

        if result.error:
            raise Exception("Cannot connect to UDP server " + str(host) + " on port " + str(port))

        # Return info in json format
        testInfo["data"] = {
            "bandwidth" : {
                "total" : result.Mbps,
                "unit" : "Mbps"
            },              
            "jitter" : {
                "total" : result.jitter_ms,
                "unit" : "ms"
            },
            "packet_loss" : {
                "percentage" : result.lost_percent
            }
        } 

    except Exception as e:
        testInfo["type"] = "error"
        testInfo["data"] = format(e)

    return testInfo 
  

def ping_test(host = '127.0.0.1', runs = 10, interval = 10, message_size = 60):
    """Runs a number ping runs tests in order to obtain RTT values using icmp packets. 

    Parameters
    ----------
    host : str
        The host to connect to, by default is localhost
    count : int
        The number of runs 
    interval : int
        The interval in seconds between runs
    message_size: int
        The number of bytes added to the icmp packet

    Returns
    -------
    python dict 
        Python dict with information about the performed test, including min, max and average measured RTT.
        Error information in data if any error is caught. 
    """

    print("ICMP test: sending ping to host " + host);

    testInfo = {
            "protocol": "icmp",
            "type": "results",
            "data": {}
    }

    try:
        # Retrives information about the ping test
        ping_info = ping(host, count = runs, interval = interval, size = message_size)

        testInfo["data"] = {
            "rtt": {                    
                "min" : ping_info.rtt_min_ms,
                "max" : ping_info.rtt_max_ms,
                "avg" : ping_info.rtt_avg_ms,
                "unit" : "ms"
            },
            "packet": {                    
                "size" : message_size,
                "unit" : "bytes"
            }
        }        

    except Exception as error:
        testInfo["type"] = "error"
        testInfo["data"] = format(error)

    return testInfo

def complete_test(host_list, port, runs = 10, interval = 10):
    """Runs the complete test suit for a list of hosts.

    Parameters
    ----------
    host_list : str (ip)
        The host list containing the hosts to connect to
    port : int
        The port to connect to in every host
    runs : int
        The number of runs for each host and test, by default 10
    interval: int (seconds)
        The interval between each run, by default 10 seconds

    Returns
    -------
    json str  
        json string with information about the performed tests for every host
    """

    print("Complete test: using the complete test suit in: " + str(host_list) + "\n")

    testInfo = {
        "host_list": host_list,
        "runs": runs,
        "interval": interval,
        "performance": []
    }

    
    for host in host_list:

        resultsInfo = {
            "ip": host,
            "info": []
        }

        tcp_resutls = tcp_test(host, port, runs, interval)
        udp_results = udp_test(host, port)
        ping_results = ping_test(host, runs, interval)

        resultsInfo["info"].append(tcp_resutls)
        resultsInfo["info"].append(udp_results)
        resultsInfo["info"].append(ping_results)
        
        testInfo["performance"].append(resultsInfo)
    
    return json.dumps(testInfo, indent = 2) 